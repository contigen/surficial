const BASE_URL = `https://api.unleashnfts.com/api`

const TOKEN = process.env.BITSCRUNCH_API_KEY

type ApiClientOptions =
  | { apiURL: string; version?: never }
  | { apiURL?: never; version: `v${number}` }

export async function ApiClient<T>(
  endpoint: string,
  opts: RequestInit = {},
  options?: ApiClientOptions
): Promise<T> {
  if (!TOKEN) throw new Error(`API Key not set`)
  const apiURL = options?.apiURL
  const version = options?.version

  const API_VERSION = version || `v2`
  const API_BASE_URL = apiURL || `${BASE_URL}/${API_VERSION}/${endpoint}`
  try {
    const headers: Record<string, string> = {
      ...(TOKEN ? { 'x-api-key': TOKEN } : {}),
      ...((opts.headers as Record<string, string>) || {}),
    }
    headers['accept'] = `application/json`

    const response = await fetch(API_BASE_URL, {
      headers,
      ...opts,
    })
    if (!response.ok) {
      const err = new Error(`HTTP Error`)
      err.name = `Error ${response.status}`
      err.cause = response.statusText
      throw err
    }
    return response.json()
  } catch (err: any) {
    throw new Error(err)
  }
}
