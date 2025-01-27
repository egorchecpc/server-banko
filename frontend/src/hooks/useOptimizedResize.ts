import { useEffect, useRef, useState } from 'react'

export function useOptimizedResize() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameId = useRef<number>()
  const resizeObserverRef = useRef<ResizeObserver>()

  useEffect(() => {
    if (!containerRef.current) return

    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    // Инициализация ResizeObserver с throttling через requestAnimationFrame
    resizeObserverRef.current = new ResizeObserver((entries) => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }

      animationFrameId.current = requestAnimationFrame(() => {
        updateDimensions()
      })
    })

    resizeObserverRef.current.observe(containerRef.current)
    updateDimensions() // Начальное измерение

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect()
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return { containerRef, dimensions }
}
