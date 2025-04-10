/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthImport } from './routes/auth'
import { Route as MainLayoutImport } from './routes/_main-layout'
import { Route as LayoutWithoutSidebarImport } from './routes/_layout-without-sidebar'
import { Route as CustomLayoutImport } from './routes/_custom-layout'
import { Route as ClearLayoutImport } from './routes/_clear-layout'
import { Route as BasicLayoutImport } from './routes/_basic-layout'
import { Route as R404Import } from './routes/404'
import { Route as IndexImport } from './routes/index'
import { Route as MainLayoutDatasetImport } from './routes/_main-layout/dataset'
import { Route as MainLayoutAppsImport } from './routes/_main-layout/apps'
import { Route as MainLayoutAnalyzerImport } from './routes/_main-layout/analyzer'
import { Route as ClearLayoutProfileImport } from './routes/_clear-layout/profile'
import { Route as MainLayoutReportsIndexImport } from './routes/_main-layout/reports/index'
import { Route as BasicLayoutReportsReportIdIndexImport } from './routes/_basic-layout/reports/$reportId/index'
import { Route as MainLayoutReportsReportIdCreditTypeImport } from './routes/_main-layout/reports/$reportId/credit-type'
import { Route as LayoutWithoutSidebarReportsReportIdStressTestingImport } from './routes/_layout-without-sidebar/reports/$reportId/stress-testing'
import { Route as LayoutWithoutSidebarReportsReportIdBiAnalyticsImport } from './routes/_layout-without-sidebar/reports/$reportId/bi-analytics'
import { Route as CustomLayoutReportsReportIdNewReportImport } from './routes/_custom-layout/reports/$reportId/new-report'
import { Route as ClearLayoutReportsReportIdCreditListImport } from './routes/_clear-layout/reports/$reportId/credit-list'
import { Route as BasicLayoutReportsReportIdDashboardImport } from './routes/_basic-layout/reports/$reportId/dashboard'

// Create/Update Routes

const AuthRoute = AuthImport.update({
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const MainLayoutRoute = MainLayoutImport.update({
  id: '/_main-layout',
  getParentRoute: () => rootRoute,
} as any)

const LayoutWithoutSidebarRoute = LayoutWithoutSidebarImport.update({
  id: '/_layout-without-sidebar',
  getParentRoute: () => rootRoute,
} as any)

const CustomLayoutRoute = CustomLayoutImport.update({
  id: '/_custom-layout',
  getParentRoute: () => rootRoute,
} as any)

const ClearLayoutRoute = ClearLayoutImport.update({
  id: '/_clear-layout',
  getParentRoute: () => rootRoute,
} as any)

const BasicLayoutRoute = BasicLayoutImport.update({
  id: '/_basic-layout',
  getParentRoute: () => rootRoute,
} as any)

const R404Route = R404Import.update({
  path: '/404',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const MainLayoutDatasetRoute = MainLayoutDatasetImport.update({
  path: '/dataset',
  getParentRoute: () => MainLayoutRoute,
} as any)

const MainLayoutAppsRoute = MainLayoutAppsImport.update({
  path: '/apps',
  getParentRoute: () => MainLayoutRoute,
} as any)

const MainLayoutAnalyzerRoute = MainLayoutAnalyzerImport.update({
  path: '/analyzer',
  getParentRoute: () => MainLayoutRoute,
} as any)

const ClearLayoutProfileRoute = ClearLayoutProfileImport.update({
  path: '/profile',
  getParentRoute: () => ClearLayoutRoute,
} as any)

const MainLayoutReportsIndexRoute = MainLayoutReportsIndexImport.update({
  path: '/reports/',
  getParentRoute: () => MainLayoutRoute,
} as any)

const BasicLayoutReportsReportIdIndexRoute =
  BasicLayoutReportsReportIdIndexImport.update({
    path: '/reports/$reportId/',
    getParentRoute: () => BasicLayoutRoute,
  } as any)

const MainLayoutReportsReportIdCreditTypeRoute =
  MainLayoutReportsReportIdCreditTypeImport.update({
    path: '/reports/$reportId/credit-type',
    getParentRoute: () => MainLayoutRoute,
  } as any)

const LayoutWithoutSidebarReportsReportIdStressTestingRoute =
  LayoutWithoutSidebarReportsReportIdStressTestingImport.update({
    path: '/reports/$reportId/stress-testing',
    getParentRoute: () => LayoutWithoutSidebarRoute,
  } as any)

const LayoutWithoutSidebarReportsReportIdBiAnalyticsRoute =
  LayoutWithoutSidebarReportsReportIdBiAnalyticsImport.update({
    path: '/reports/$reportId/bi-analytics',
    getParentRoute: () => LayoutWithoutSidebarRoute,
  } as any)

const CustomLayoutReportsReportIdNewReportRoute =
  CustomLayoutReportsReportIdNewReportImport.update({
    path: '/reports/$reportId/new-report',
    getParentRoute: () => CustomLayoutRoute,
  } as any)

const ClearLayoutReportsReportIdCreditListRoute =
  ClearLayoutReportsReportIdCreditListImport.update({
    path: '/reports/$reportId/credit-list',
    getParentRoute: () => ClearLayoutRoute,
  } as any)

const BasicLayoutReportsReportIdDashboardRoute =
  BasicLayoutReportsReportIdDashboardImport.update({
    path: '/reports/$reportId/dashboard',
    getParentRoute: () => BasicLayoutRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/404': {
      id: '/404'
      path: '/404'
      fullPath: '/404'
      preLoaderRoute: typeof R404Import
      parentRoute: typeof rootRoute
    }
    '/_basic-layout': {
      id: '/_basic-layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof BasicLayoutImport
      parentRoute: typeof rootRoute
    }
    '/_clear-layout': {
      id: '/_clear-layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ClearLayoutImport
      parentRoute: typeof rootRoute
    }
    '/_custom-layout': {
      id: '/_custom-layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof CustomLayoutImport
      parentRoute: typeof rootRoute
    }
    '/_layout-without-sidebar': {
      id: '/_layout-without-sidebar'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutWithoutSidebarImport
      parentRoute: typeof rootRoute
    }
    '/_main-layout': {
      id: '/_main-layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof MainLayoutImport
      parentRoute: typeof rootRoute
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_clear-layout/profile': {
      id: '/_clear-layout/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ClearLayoutProfileImport
      parentRoute: typeof ClearLayoutImport
    }
    '/_main-layout/analyzer': {
      id: '/_main-layout/analyzer'
      path: '/analyzer'
      fullPath: '/analyzer'
      preLoaderRoute: typeof MainLayoutAnalyzerImport
      parentRoute: typeof MainLayoutImport
    }
    '/_main-layout/apps': {
      id: '/_main-layout/apps'
      path: '/apps'
      fullPath: '/apps'
      preLoaderRoute: typeof MainLayoutAppsImport
      parentRoute: typeof MainLayoutImport
    }
    '/_main-layout/dataset': {
      id: '/_main-layout/dataset'
      path: '/dataset'
      fullPath: '/dataset'
      preLoaderRoute: typeof MainLayoutDatasetImport
      parentRoute: typeof MainLayoutImport
    }
    '/_main-layout/reports/': {
      id: '/_main-layout/reports/'
      path: '/reports'
      fullPath: '/reports'
      preLoaderRoute: typeof MainLayoutReportsIndexImport
      parentRoute: typeof MainLayoutImport
    }
    '/_basic-layout/reports/$reportId/dashboard': {
      id: '/_basic-layout/reports/$reportId/dashboard'
      path: '/reports/$reportId/dashboard'
      fullPath: '/reports/$reportId/dashboard'
      preLoaderRoute: typeof BasicLayoutReportsReportIdDashboardImport
      parentRoute: typeof BasicLayoutImport
    }
    '/_clear-layout/reports/$reportId/credit-list': {
      id: '/_clear-layout/reports/$reportId/credit-list'
      path: '/reports/$reportId/credit-list'
      fullPath: '/reports/$reportId/credit-list'
      preLoaderRoute: typeof ClearLayoutReportsReportIdCreditListImport
      parentRoute: typeof ClearLayoutImport
    }
    '/_custom-layout/reports/$reportId/new-report': {
      id: '/_custom-layout/reports/$reportId/new-report'
      path: '/reports/$reportId/new-report'
      fullPath: '/reports/$reportId/new-report'
      preLoaderRoute: typeof CustomLayoutReportsReportIdNewReportImport
      parentRoute: typeof CustomLayoutImport
    }
    '/_layout-without-sidebar/reports/$reportId/bi-analytics': {
      id: '/_layout-without-sidebar/reports/$reportId/bi-analytics'
      path: '/reports/$reportId/bi-analytics'
      fullPath: '/reports/$reportId/bi-analytics'
      preLoaderRoute: typeof LayoutWithoutSidebarReportsReportIdBiAnalyticsImport
      parentRoute: typeof LayoutWithoutSidebarImport
    }
    '/_layout-without-sidebar/reports/$reportId/stress-testing': {
      id: '/_layout-without-sidebar/reports/$reportId/stress-testing'
      path: '/reports/$reportId/stress-testing'
      fullPath: '/reports/$reportId/stress-testing'
      preLoaderRoute: typeof LayoutWithoutSidebarReportsReportIdStressTestingImport
      parentRoute: typeof LayoutWithoutSidebarImport
    }
    '/_main-layout/reports/$reportId/credit-type': {
      id: '/_main-layout/reports/$reportId/credit-type'
      path: '/reports/$reportId/credit-type'
      fullPath: '/reports/$reportId/credit-type'
      preLoaderRoute: typeof MainLayoutReportsReportIdCreditTypeImport
      parentRoute: typeof MainLayoutImport
    }
    '/_basic-layout/reports/$reportId/': {
      id: '/_basic-layout/reports/$reportId/'
      path: '/reports/$reportId'
      fullPath: '/reports/$reportId'
      preLoaderRoute: typeof BasicLayoutReportsReportIdIndexImport
      parentRoute: typeof BasicLayoutImport
    }
  }
}

// Create and export the route tree

interface BasicLayoutRouteChildren {
  BasicLayoutReportsReportIdDashboardRoute: typeof BasicLayoutReportsReportIdDashboardRoute
  BasicLayoutReportsReportIdIndexRoute: typeof BasicLayoutReportsReportIdIndexRoute
}

const BasicLayoutRouteChildren: BasicLayoutRouteChildren = {
  BasicLayoutReportsReportIdDashboardRoute:
    BasicLayoutReportsReportIdDashboardRoute,
  BasicLayoutReportsReportIdIndexRoute: BasicLayoutReportsReportIdIndexRoute,
}

const BasicLayoutRouteWithChildren = BasicLayoutRoute._addFileChildren(
  BasicLayoutRouteChildren,
)

interface ClearLayoutRouteChildren {
  ClearLayoutProfileRoute: typeof ClearLayoutProfileRoute
  ClearLayoutReportsReportIdCreditListRoute: typeof ClearLayoutReportsReportIdCreditListRoute
}

const ClearLayoutRouteChildren: ClearLayoutRouteChildren = {
  ClearLayoutProfileRoute: ClearLayoutProfileRoute,
  ClearLayoutReportsReportIdCreditListRoute:
    ClearLayoutReportsReportIdCreditListRoute,
}

const ClearLayoutRouteWithChildren = ClearLayoutRoute._addFileChildren(
  ClearLayoutRouteChildren,
)

interface CustomLayoutRouteChildren {
  CustomLayoutReportsReportIdNewReportRoute: typeof CustomLayoutReportsReportIdNewReportRoute
}

const CustomLayoutRouteChildren: CustomLayoutRouteChildren = {
  CustomLayoutReportsReportIdNewReportRoute:
    CustomLayoutReportsReportIdNewReportRoute,
}

const CustomLayoutRouteWithChildren = CustomLayoutRoute._addFileChildren(
  CustomLayoutRouteChildren,
)

interface LayoutWithoutSidebarRouteChildren {
  LayoutWithoutSidebarReportsReportIdBiAnalyticsRoute: typeof LayoutWithoutSidebarReportsReportIdBiAnalyticsRoute
  LayoutWithoutSidebarReportsReportIdStressTestingRoute: typeof LayoutWithoutSidebarReportsReportIdStressTestingRoute
}

const LayoutWithoutSidebarRouteChildren: LayoutWithoutSidebarRouteChildren = {
  LayoutWithoutSidebarReportsReportIdBiAnalyticsRoute:
    LayoutWithoutSidebarReportsReportIdBiAnalyticsRoute,
  LayoutWithoutSidebarReportsReportIdStressTestingRoute:
    LayoutWithoutSidebarReportsReportIdStressTestingRoute,
}

const LayoutWithoutSidebarRouteWithChildren =
  LayoutWithoutSidebarRoute._addFileChildren(LayoutWithoutSidebarRouteChildren)

interface MainLayoutRouteChildren {
  MainLayoutAnalyzerRoute: typeof MainLayoutAnalyzerRoute
  MainLayoutAppsRoute: typeof MainLayoutAppsRoute
  MainLayoutDatasetRoute: typeof MainLayoutDatasetRoute
  MainLayoutReportsIndexRoute: typeof MainLayoutReportsIndexRoute
  MainLayoutReportsReportIdCreditTypeRoute: typeof MainLayoutReportsReportIdCreditTypeRoute
}

const MainLayoutRouteChildren: MainLayoutRouteChildren = {
  MainLayoutAnalyzerRoute: MainLayoutAnalyzerRoute,
  MainLayoutAppsRoute: MainLayoutAppsRoute,
  MainLayoutDatasetRoute: MainLayoutDatasetRoute,
  MainLayoutReportsIndexRoute: MainLayoutReportsIndexRoute,
  MainLayoutReportsReportIdCreditTypeRoute:
    MainLayoutReportsReportIdCreditTypeRoute,
}

const MainLayoutRouteWithChildren = MainLayoutRoute._addFileChildren(
  MainLayoutRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/404': typeof R404Route
  '': typeof MainLayoutRouteWithChildren
  '/auth': typeof AuthRoute
  '/profile': typeof ClearLayoutProfileRoute
  '/analyzer': typeof MainLayoutAnalyzerRoute
  '/apps': typeof MainLayoutAppsRoute
  '/dataset': typeof MainLayoutDatasetRoute
  '/reports': typeof MainLayoutReportsIndexRoute
  '/reports/$reportId/dashboard': typeof BasicLayoutReportsReportIdDashboardRoute
  '/reports/$reportId/credit-list': typeof ClearLayoutReportsReportIdCreditListRoute
  '/reports/$reportId/new-report': typeof CustomLayoutReportsReportIdNewReportRoute
  '/reports/$reportId/bi-analytics': typeof LayoutWithoutSidebarReportsReportIdBiAnalyticsRoute
  '/reports/$reportId/stress-testing': typeof LayoutWithoutSidebarReportsReportIdStressTestingRoute
  '/reports/$reportId/credit-type': typeof MainLayoutReportsReportIdCreditTypeRoute
  '/reports/$reportId': typeof BasicLayoutReportsReportIdIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/404': typeof R404Route
  '': typeof MainLayoutRouteWithChildren
  '/auth': typeof AuthRoute
  '/profile': typeof ClearLayoutProfileRoute
  '/analyzer': typeof MainLayoutAnalyzerRoute
  '/apps': typeof MainLayoutAppsRoute
  '/dataset': typeof MainLayoutDatasetRoute
  '/reports': typeof MainLayoutReportsIndexRoute
  '/reports/$reportId/dashboard': typeof BasicLayoutReportsReportIdDashboardRoute
  '/reports/$reportId/credit-list': typeof ClearLayoutReportsReportIdCreditListRoute
  '/reports/$reportId/new-report': typeof CustomLayoutReportsReportIdNewReportRoute
  '/reports/$reportId/bi-analytics': typeof LayoutWithoutSidebarReportsReportIdBiAnalyticsRoute
  '/reports/$reportId/stress-testing': typeof LayoutWithoutSidebarReportsReportIdStressTestingRoute
  '/reports/$reportId/credit-type': typeof MainLayoutReportsReportIdCreditTypeRoute
  '/reports/$reportId': typeof BasicLayoutReportsReportIdIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/404': typeof R404Route
  '/_basic-layout': typeof BasicLayoutRouteWithChildren
  '/_clear-layout': typeof ClearLayoutRouteWithChildren
  '/_custom-layout': typeof CustomLayoutRouteWithChildren
  '/_layout-without-sidebar': typeof LayoutWithoutSidebarRouteWithChildren
  '/_main-layout': typeof MainLayoutRouteWithChildren
  '/auth': typeof AuthRoute
  '/_clear-layout/profile': typeof ClearLayoutProfileRoute
  '/_main-layout/analyzer': typeof MainLayoutAnalyzerRoute
  '/_main-layout/apps': typeof MainLayoutAppsRoute
  '/_main-layout/dataset': typeof MainLayoutDatasetRoute
  '/_main-layout/reports/': typeof MainLayoutReportsIndexRoute
  '/_basic-layout/reports/$reportId/dashboard': typeof BasicLayoutReportsReportIdDashboardRoute
  '/_clear-layout/reports/$reportId/credit-list': typeof ClearLayoutReportsReportIdCreditListRoute
  '/_custom-layout/reports/$reportId/new-report': typeof CustomLayoutReportsReportIdNewReportRoute
  '/_layout-without-sidebar/reports/$reportId/bi-analytics': typeof LayoutWithoutSidebarReportsReportIdBiAnalyticsRoute
  '/_layout-without-sidebar/reports/$reportId/stress-testing': typeof LayoutWithoutSidebarReportsReportIdStressTestingRoute
  '/_main-layout/reports/$reportId/credit-type': typeof MainLayoutReportsReportIdCreditTypeRoute
  '/_basic-layout/reports/$reportId/': typeof BasicLayoutReportsReportIdIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/404'
    | ''
    | '/auth'
    | '/profile'
    | '/analyzer'
    | '/apps'
    | '/dataset'
    | '/reports'
    | '/reports/$reportId/dashboard'
    | '/reports/$reportId/credit-list'
    | '/reports/$reportId/new-report'
    | '/reports/$reportId/bi-analytics'
    | '/reports/$reportId/stress-testing'
    | '/reports/$reportId/credit-type'
    | '/reports/$reportId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/404'
    | ''
    | '/auth'
    | '/profile'
    | '/analyzer'
    | '/apps'
    | '/dataset'
    | '/reports'
    | '/reports/$reportId/dashboard'
    | '/reports/$reportId/credit-list'
    | '/reports/$reportId/new-report'
    | '/reports/$reportId/bi-analytics'
    | '/reports/$reportId/stress-testing'
    | '/reports/$reportId/credit-type'
    | '/reports/$reportId'
  id:
    | '__root__'
    | '/'
    | '/404'
    | '/_basic-layout'
    | '/_clear-layout'
    | '/_custom-layout'
    | '/_layout-without-sidebar'
    | '/_main-layout'
    | '/auth'
    | '/_clear-layout/profile'
    | '/_main-layout/analyzer'
    | '/_main-layout/apps'
    | '/_main-layout/dataset'
    | '/_main-layout/reports/'
    | '/_basic-layout/reports/$reportId/dashboard'
    | '/_clear-layout/reports/$reportId/credit-list'
    | '/_custom-layout/reports/$reportId/new-report'
    | '/_layout-without-sidebar/reports/$reportId/bi-analytics'
    | '/_layout-without-sidebar/reports/$reportId/stress-testing'
    | '/_main-layout/reports/$reportId/credit-type'
    | '/_basic-layout/reports/$reportId/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  R404Route: typeof R404Route
  BasicLayoutRoute: typeof BasicLayoutRouteWithChildren
  ClearLayoutRoute: typeof ClearLayoutRouteWithChildren
  CustomLayoutRoute: typeof CustomLayoutRouteWithChildren
  LayoutWithoutSidebarRoute: typeof LayoutWithoutSidebarRouteWithChildren
  MainLayoutRoute: typeof MainLayoutRouteWithChildren
  AuthRoute: typeof AuthRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  R404Route: R404Route,
  BasicLayoutRoute: BasicLayoutRouteWithChildren,
  ClearLayoutRoute: ClearLayoutRouteWithChildren,
  CustomLayoutRoute: CustomLayoutRouteWithChildren,
  LayoutWithoutSidebarRoute: LayoutWithoutSidebarRouteWithChildren,
  MainLayoutRoute: MainLayoutRouteWithChildren,
  AuthRoute: AuthRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/404",
        "/_basic-layout",
        "/_clear-layout",
        "/_custom-layout",
        "/_layout-without-sidebar",
        "/_main-layout",
        "/auth"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/404": {
      "filePath": "404.tsx"
    },
    "/_basic-layout": {
      "filePath": "_basic-layout.tsx",
      "children": [
        "/_basic-layout/reports/$reportId/dashboard",
        "/_basic-layout/reports/$reportId/"
      ]
    },
    "/_clear-layout": {
      "filePath": "_clear-layout.tsx",
      "children": [
        "/_clear-layout/profile",
        "/_clear-layout/reports/$reportId/credit-list"
      ]
    },
    "/_custom-layout": {
      "filePath": "_custom-layout.tsx",
      "children": [
        "/_custom-layout/reports/$reportId/new-report"
      ]
    },
    "/_layout-without-sidebar": {
      "filePath": "_layout-without-sidebar.tsx",
      "children": [
        "/_layout-without-sidebar/reports/$reportId/bi-analytics",
        "/_layout-without-sidebar/reports/$reportId/stress-testing"
      ]
    },
    "/_main-layout": {
      "filePath": "_main-layout.tsx",
      "children": [
        "/_main-layout/analyzer",
        "/_main-layout/apps",
        "/_main-layout/dataset",
        "/_main-layout/reports/",
        "/_main-layout/reports/$reportId/credit-type"
      ]
    },
    "/auth": {
      "filePath": "auth.tsx"
    },
    "/_clear-layout/profile": {
      "filePath": "_clear-layout/profile.tsx",
      "parent": "/_clear-layout"
    },
    "/_main-layout/analyzer": {
      "filePath": "_main-layout/analyzer.tsx",
      "parent": "/_main-layout"
    },
    "/_main-layout/apps": {
      "filePath": "_main-layout/apps.tsx",
      "parent": "/_main-layout"
    },
    "/_main-layout/dataset": {
      "filePath": "_main-layout/dataset.tsx",
      "parent": "/_main-layout"
    },
    "/_main-layout/reports/": {
      "filePath": "_main-layout/reports/index.tsx",
      "parent": "/_main-layout"
    },
    "/_basic-layout/reports/$reportId/dashboard": {
      "filePath": "_basic-layout/reports/$reportId/dashboard.tsx",
      "parent": "/_basic-layout"
    },
    "/_clear-layout/reports/$reportId/credit-list": {
      "filePath": "_clear-layout/reports/$reportId/credit-list.tsx",
      "parent": "/_clear-layout"
    },
    "/_custom-layout/reports/$reportId/new-report": {
      "filePath": "_custom-layout/reports/$reportId/new-report.tsx",
      "parent": "/_custom-layout"
    },
    "/_layout-without-sidebar/reports/$reportId/bi-analytics": {
      "filePath": "_layout-without-sidebar/reports/$reportId/bi-analytics.tsx",
      "parent": "/_layout-without-sidebar"
    },
    "/_layout-without-sidebar/reports/$reportId/stress-testing": {
      "filePath": "_layout-without-sidebar/reports/$reportId/stress-testing.tsx",
      "parent": "/_layout-without-sidebar"
    },
    "/_main-layout/reports/$reportId/credit-type": {
      "filePath": "_main-layout/reports/$reportId/credit-type.tsx",
      "parent": "/_main-layout"
    },
    "/_basic-layout/reports/$reportId/": {
      "filePath": "_basic-layout/reports/$reportId/index.tsx",
      "parent": "/_basic-layout"
    }
  }
}
ROUTE_MANIFEST_END */
