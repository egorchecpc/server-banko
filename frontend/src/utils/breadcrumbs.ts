// utils/breadcrumbs.ts
export const getBreadcrumbsFromPath = (pathname: string) => {
  const allowedPaths = [
    /^\/reports\/[^/]+\/dashboard$/,
    /^\/reports\/[^/]+\/bi-analytics$/,
    /^\/reports\/[^/]+\/stress-testing$/,
  ]

  const isBreadcrumbVisible = allowedPaths.some((pattern) =>
    pattern.test(pathname)
  )

  if (!isBreadcrumbVisible) return []

  // Преобразуем путь
  const pathParts = pathname.split('/').filter(Boolean)
  const section = pathParts[2] // dashboard, bi-analytics и т.п.

  const titles: Record<string, string> = {
    dashboard: 'Основные показатели',
    'bi-analytics': 'BI Аналитика',
    'stress-testing': 'Стресс-тестирование',
  }

  return [
    {
      label: 'Отчёты',
      href: '/reports',
    },
    {
      label: titles[section] || section,
      href: undefined,
    },
  ]
}
