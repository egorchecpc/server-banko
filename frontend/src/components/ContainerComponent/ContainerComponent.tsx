import { FC, ReactNode, CSSProperties } from 'react'

interface ContainerComponentProps {
  title?: string
  children: ReactNode
  withBg: boolean
  className?: string
  style?: CSSProperties
}

const ContainerComponent: FC<ContainerComponentProps> = ({
  title,
  children,
  withBg,
  className = '',
  style,
}) => {
  const baseClasses = withBg
    ? 'h-full w-full rounded-lg border border-grey-900/30 bg-grey-300/40 p-1.5 shadow-lg'
    : ''

  return (
    <div className={`${baseClasses} ${className}`} style={style}>
      {title && (
        <div className="my-2 ml-4 flex items-center">
          <div className="text-xl font-bold leading-6 text-black-1000">
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
  className?: string
}

const ContainerHeader: FC<ContainerHeaderProps> = ({
  children,
  className = '',
}) => <div className={`my-2 ml-4 flex ${className}`}>{children}</div>

interface ContainerBodyProps {
  isScrolling: boolean
  orientation?: 'horizontal' | 'vertical'
  children: ReactNode
  className?: string
  style?: CSSProperties
}

const ContainerBody: FC<ContainerBodyProps> = ({
  isScrolling,
  orientation = 'auto',
  children,
  className = '',
  style,
}) => {
  const overflowClass = isScrolling ? `overflow-${orientation}` : ''
  const baseClasses = `rounded-lg border border-grey-900/30 bg-white whitespace-nowrap`

  return (
    <div
      className={`${baseClasses} ${overflowClass} ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

export { ContainerComponent, ContainerHeader, ContainerBody }
