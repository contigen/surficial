const BASE_URL = `https://api-cdv.unleashnfts.com/api`

const TOKEN = process.env.BITSCRUNCH_API_KEY

export async function ApiClient<T>(
  endpoint: string,
  opts: RequestInit = {},
  version?: string
): Promise<T> {
  if (!TOKEN) throw new Error(`API Key not set`)
  const API_VERSION = version || `v2`
  try {
    const isFormData = opts.body instanceof FormData
    const headers: Record<string, string> = {
      ...(TOKEN ? { 'x-api-key': TOKEN } : {}),
      ...((opts.headers as Record<string, string>) || {}),
    }
    !isFormData && (headers['Content-Type'] = 'application/json')

    const response = await fetch(`${BASE_URL}/${API_VERSION}/${endpoint}`, {
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
