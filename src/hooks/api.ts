/* eslint-disable no-restricted-syntax */
import { API_BASE_URL, AUTH_TOKEN_KEY } from '../constants'
import { QueryFunction, QueryKey } from '@tanstack/react-query'
import axios from 'axios'

const api = axios.create({
  baseURL: API_BASE_URL,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRF-Token',
})

export interface JobDocument {
  name: string
  url: string
}

if (localStorage.getItem(AUTH_TOKEN_KEY)) {
  api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
    AUTH_TOKEN_KEY
  )}`
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      api.defaults.headers.common['Authorization'] = null
      localStorage.removeItem(AUTH_TOKEN_KEY)
      if (error?.request?.responseURL !== `${API_BASE_URL}/login`) {
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default api

/**
 * https://react-query.tanstack.com/guides/default-query-function
 *
 * ```tsx
 * // GET /brands/stuff
 * const { data } = useQuery(['brands', 'stuff'])
 *
 * // GET /jobs
 * const { data } = useQuery('jobs')
 *
 * // GET /brands/stuff?someFilter=123&otherFilter=456
 * const { data } = useQuery(['brands', 'stuff', { someFilter: 123, otherFilter: 456 }])
 * ```
 */
export const defaultQueryFn: QueryFunction<unknown, QueryKey> = async ({
  queryKey,
}) => {
  // TODO: Add unit tests
  // Only add non-object (non-filter) keys to the URL
  // ['brands', 'stuff', { key: 123 }] => '/brands/stuff'
  let url = queryKey.filter((key) => typeof key !== 'object').join('/') + '?'

  queryKey.forEach((key) => {
    // Add URL parameters to URL (ex.: ['brands', 'stuff', { filter: 123 }] => '/brands/stuff?filter=123')
    if (key && typeof key === 'object') {
      url += Object.keys(key)
        .filter(
          (paramKey) =>
            key[paramKey as keyof typeof key] !== undefined &&
            key[paramKey as keyof typeof key] !== null
        )
        .map((paramKey) => {
          if (Array.isArray(key[paramKey as keyof typeof key])) {
            // Array params
            // { key: ['a', 'b', 'c'] } => 'key[]=a&key[]=b&key[]=c'
            const value = (key[paramKey as keyof typeof key] as any[]).map(
              (item) => `${item}`
            ) // null should become 'null' etc.

            return `${paramKey}[]=${value.join(`&${paramKey}[]=`)}`
          }

          return paramKey + '=' + key[paramKey as keyof typeof key]
        })
        .join('&')
    }
  })

  if (url.endsWith('?')) {
    // Remove trailing '?' from url (meaning no URL params were passed)
    url = url.slice(0, -1)
  }

  const { data } = await api.get(url)

  return data
}
