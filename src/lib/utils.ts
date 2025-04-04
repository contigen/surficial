import { Blockchain } from '&/types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function withTryCatch<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn()
  } catch (err) {
    console.error(err)
    return null
  }
}

export function cosineSimilarity(vecA: number[], vecB: number[]) {
  const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0)
  const magnitudeA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0))
  const magnitudeB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0))
  return dotProduct / (magnitudeA * magnitudeB)
}

export function computeDynamicThreshold(
  similarityScores: { similarity: number }[]
) {
  const scores = similarityScores.map(({ similarity }) => similarity)
  const mean = scores.reduce((a, b) => a + b, 0) / scores.length
  const stdDev = Math.sqrt(
    scores.reduce((a, b) => a + (b - mean) ** 2, 0) / scores.length
  )
  return mean + 0.5 * stdDev
}

export function getPriceCategory(price: number) {
  if (price < 0.1) return 'very low price'
  if (price < 0.5) return 'low price'
  if (price < 2) return 'medium price'
  if (price < 5) return 'high price'
  return 'very high price'
}

const NETWORK_CHAIN_IDS: Record<number, Blockchain> = {
  1: 'ethereum',
  56: 'binance',
  137: 'polygon',
  43114: 'avalanche',
  18159: 'linea',
  501: 'solana',
  505: 'bitcoin',
}

export function getNetworkName(chainId: number) {
  return NETWORK_CHAIN_IDS[chainId] || 'ethereum'
}

export function getNetworkID(network: Blockchain) {
  const chainEntries = Object.entries(NETWORK_CHAIN_IDS)
  return +(
    chainEntries.find(chain => chain[1] === network.toLowerCase())?.[0] || 1
  )
}

export function validateOrThrow<T>(
  data: T | null | undefined,
  fieldName: string
): T {
  if (!data) {
    console.warn(`Missing data: ${fieldName}`)
    return [] as T
  }
  return data
}

export function parseCloseColours(colorsString: string): string[] {
  try {
    return JSON.parse(colorsString.replace(/'/g, '"'))
  } catch {
    return []
  }
}
