export const BACKEND_API = 'https://api.pogb2b.ru/api'
export const APP_ID = 1
export const CLIENT_UNIQ_ID = '8e9e3404-a88c-40e5-8157-c52358bcbdbc'
export const USER_UNIQ_ID = '4d6ed9b1-db7c-611f-5326-7c62f779f18c'
export const DOMAIN = 't-bank'

export enum AppRoute {
  Root = '/',
  Welcome = '/welcome',
  Profile = '/profile',
  Questions = '/questions',
  Start = '/start',
  Questionnaire = '/questionnaire',
  Finish = '/finish',
  NotFound = '*'
}

// export enum ApiRoute {
//   Match = '/euro24',
//   Dicts = 'dicts',
//   Matches = '/matches',
//   forecast = 'forecast',
//   forecastState = 'forecast/state',

//   Users = '/users',
//   RegisterStart = '/register/start',
//   RegisterConfirm = '/register/confirm',
//   RegisterResend = '/register/resend',
//   RemindStart = '/remind/start',
//   RemindConfirm = '/remind/confirm',
//   UserCheckEmail = '/user/check-email',
//   UserLogin = '/user/login',
//   UserCheckSession = '/user/check-session'
// }
