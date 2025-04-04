export const API_ENDPOINTS = {
  GET_PD_DATA: '/pddata',
  GET_LGD_DATA: '/lgddata',
  GET_ECL_DATA_V1: '/ecldata1',
  GET_ECL_DATA_V2: '/ecldata2',
  GET_GBV_DATA: '/gbvdata',
  GET_RISK_METRIC_DATA: '/riskmetricdata',
  GET_CREDIT_LIST_DATA: '/creditlistdata',
  POST_MACRO_SETTINGS_DATA: '/macro',
  POST_FORM_DATA: '/debtor-form-data',
  BI: {
    ECL_CHARTS: {
      GET_GROSS_CARRYING_AMOUNT: '/ecl/grossCarryingAmount/sumByDelay',
      GET_GROSS_CARRYING_AMOUNT_DEFAULT: '/ecl/grossCarryingAmount/sum',
      GET_LOANS: '/ecl/loans/sumByDelay',
      GET_WEIGHT_AVERAGE_PD: '/ecl/weightedAveragePD',
      GET_HEATMAP: '/ecl/heatMap',
    },
    AMOUNT_CHARTS: {
      GET_AMOUNT_CHART: '/amount-chart',
      GET_AMOUNT_CHART_PERCENT: '/amount-chart_p',
    },
    GET_GBV_STAGE: '/gbvstagedata',
    GET_VBS_OKU: '/vbs',
  },
  COMMON: {
    CREDIT_LIST: {
      GET_CONTRACTS: '/contracts',
    },
    REPORTS: {
      GET_REPORTS: '/profilereportsdata',
      UPDATE_REPORTS: '/update-report',
      CREATE_REPORTS: '/create-report',
    },
    TEMPLATES: {
      GET_ALL: '/templates',
      UPDATE: (id: string) => `/templates/${id}`,
      DELETE: (id: string) => `/templates/${id}`,
    },
  },

  DASHBOARD: {},
}
