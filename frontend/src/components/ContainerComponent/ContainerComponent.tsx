import { FC, ReactNode } from 'react'

interface ContainerComponentProps {
  title?: string
  children: ReactNode
  withBg: boolean
  className?: string // добавляем класс для стилизации
  style?: React.CSSProperties // добавляем возможность передавать inline стили
}

const ContainerComponent: FC<ContainerComponentProps> = ({
  title,
  children,
  withBg,
  className = '', // по умолчанию пустая строка
  style, // используем style
}) => {
  return (
    <div
      className={`${withBg ? 'h-full w-full rounded-lg border border-grey-900/30 bg-grey-300/40 p-1.5 shadow-lg' : ''} ${className}`}
      style={style} // применяем inline стили
    >
      {title && (
        <div className="my-2 ml-4 flex items-center">
          <div className="text-xl font-bold leading-24 text-black-1000">
            {title}
          </div>
        </div>
      )}
      {children}
    </div>
  )
}

interface ContainerHeaderProps {
  children: ReactNode
  className?: string // добавляем класс для стилизации
}

const ContainerHeader: FC<ContainerHeaderProps> = ({
  children,
  className = '',
}) => <div className={`my-2 ml-4 flex ${className}`}>{children}</div>

interface ContainerBodyProps {
  isScrolling: boolean
  orientation?: 'horizontal' | 'vertical'
  children: ReactNode
  className?: string // добавляем класс для стилизации
  style?: React.CSSProperties // добавляем возможность передавать inline стили
}

const ContainerBody: FC<ContainerBodyProps> = ({
  isScrolling,
  orientation,
  children,
  className = '', // по умолчанию пустая строка
  style, // используем style
}) => {
  const overflowClass = `overflow-${orientation || 'auto'}`

  return isScrolling ? (
    <div
      className={`whitespace-nowrap rounded-lg border border-grey-900/30 bg-white ${overflowClass} ${className}`}
      style={style} // применяем inline стили
    >
      {children}
    </div>
  ) : (
    <div
      className={`whitespace-nowrap rounded-lg border bg-white ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

export { ContainerComponent, ContainerHeader, ContainerBody }
