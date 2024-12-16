import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_basic-layout/reports')({
  component: () => <div>Hello /_basic-layout/reports!</div>,
})
