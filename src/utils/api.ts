// import { env } from '../env'

export function api(path: string, init?: RequestInit) {
  const baseUrl = process.env.NEXT_PUBLIC_URL // env.NEXT_PUBLIC_URL
  const apiPrefix = '/api'
  const url = new URL(apiPrefix.concat(path), baseUrl)

  return fetch(url, init)
}
