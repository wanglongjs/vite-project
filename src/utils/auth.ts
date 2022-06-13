import Cookie from 'js-cookie'
const TokenName: string = 'Admin-Token'

export function getToken () {
  return Cookie.get(TokenName)
}
