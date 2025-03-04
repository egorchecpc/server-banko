import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { MessageCircle, Send, X, Loader2, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useChat } from '@/context/ai-context'

// API URL for backend
const API_URL = 'http://localhost:3000'

interface Message {
  role: 'user' | 'assistant' | 'function'
  content: string
  timestamp: Date
  name?: string
}

interface ChatWidgetProps {
  isOpen: boolean
  onClose: () => void
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Make API call to Express backend
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
            name: m.name,
          })),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Handle both regular responses and function call responses
        if (data.message) {
          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content: data.message,
              timestamp: new Date(),
            },
          ])
        }

        // If there was a function call and result
        if (data.functionResult) {
          setMessages((prev) => [
            ...prev,
            {
              role: 'function',
              name: 'get_data', // Используйте правильное имя функции
              content: JSON.stringify(data.functionResult),
              timestamp: new Date(),
            },
          ])
        }
      } else {
        throw new Error(data.error || 'Ошибка при обработке запроса')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Извините, произошла ошибка при обработке вашего запроса.',
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
  }
  const { openChat } = useChat()

  // Функция для форматирования JSON в сообщениях
  const formatContent = (message: Message) => {
    if (message.role === 'function') {
      try {
        const data = JSON.parse(message.content)
        return (
          <div className="font-mono text-sm">
            <div className="mb-1 font-semibold">Результат функции:</div>
            <pre className="overflow-x-auto whitespace-pre-wrap">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )
      } catch (e) {
        return message.content
      }
    }
    return message.content
  }

  return (
    <>
      {
        <Button
          onClick={openChat}
          className="fixed bottom-14 right-3 h-12 w-12 rounded-full p-0 shadow-lg"
          size="icon"
        >
          <MessageCircle size={24} />
        </Button>
      }

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 flex h-96 w-80 flex-col px-2 py-2 shadow-lg sm:w-96">
          <CardHeader className="bg-primary text-primary-foreground py-2">
            <div className="flex justify-between py-2 text-base">
              <span>Финансовый Ассистент</span>
              <div className="flex gap-2">
                <Trash2
                  className="cursor-pointer"
                  size={20}
                  onClick={clearChat}
                />
                <X className="cursor-pointer" size={20} onClick={onClose} />
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-grow overflow-hidden p-0">
            <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
              {messages.length === 0 ? (
                <div className="text-muted-foreground flex h-full items-center justify-center">
                  Начните разговор
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      'mb-4 max-w-[80%] break-words rounded-lg p-3',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : message.role === 'function'
                          ? 'mr-auto w-full bg-slate-200'
                          : 'bg-muted mr-auto'
                    )}
                  >
                    {formatContent(message)}
                    <div
                      className={cn(
                        'mt-1 text-xs',
                        message.role === 'user'
                          ? 'text-primary-foreground/70'
                          : 'text-muted-foreground'
                      )}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </ScrollArea>
          </CardContent>

          <CardFooter className="p-2">
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Введите сообщение..."
                disabled={isLoading}
                className="flex-grow"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  )
}
