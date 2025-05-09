import i18n from '@/i18n/i18n'

export const navItems = {
  dashboard: i18n.t('header.navs.dashboard'),
  'bi-analytics': i18n.t('header.navs.biAnalytics'),
  'stress-testing': i18n.t('header.navs.stressTesting'),
}

export const userData = {
  name: 'Иван Иванов',
  position: 'Риск-менеджер',
}

export const reportType = {
  consumer: 'потребительский',
  mortgage: 'ипотечный',
  overdraft: 'овердрафт',
  cards: 'по кредитным картам',
}
