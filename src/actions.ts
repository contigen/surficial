'use server'

import { ZodError } from 'zod'
import {
  ColorDescriptionSchema,
  loginSchema,
  NFTVisualDescription,
  registerSchema,
} from './lib/schema'
import {
  createUser,
  getUser,
  updateNFTAnalysis,
  updateNFTCollectionData,
  updateNFTData,
} from './lib/db-queries'
import { signIn } from './auth'
import { ApiClient } from './api/client'
import {
  Blockchain,
  DataNotFound,
  NFTAnalytics,
  NFTCollectionMetadata,
  NFTCollectionAnalytics,
  NFTCollectionHolders,
  NFTCollectionProfile,
  NFTCollectionScores,
  NFTCollectionTraders,
  NFTCollectionWashtrade,
  NFTCollectionWhales,
  NFTData,
  NFTHolders,
  NFTMetadata,
  NFTResponse,
  NFTScores,
  NFTTopDealItem,
  NFTTopDeals,
  NFTTraders,
  NFTTraits,
  NFTTransactions,
  TokenBalance,
  WalletNFTBalance,
  WalletProfile,
  NFTCollectionData,
} from './types'
import {
  computeDynamicThreshold,
  getNetworkName,
  getPriceCategory,
  validateOrThrow,
  withTryCatch,
} from './lib/utils'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { cosineSimilarity } from './lib/utils'
import { index, pc, rateLimit } from './lib/semantic-search'

export type RegisterActionState = {
  message:
    | `User already exists`
    | `failed to create user`
    | `user created`
    | `invalid data`
    | ``
}

export type LoginActionState = {
  message: `invalid data` | `user logged_in` | `failed to login user` | ``
}

export async function registerUser(
  _: RegisterActionState,
  formData: FormData
): Promise<RegisterActionState> {
  try {
    const name = formData.get(`name`)
    const email = formData.get(`email`)
    const password = formData.get(`password`)
    const validatedFormData = await registerSchema.parseAsync({
      name,
      email,
      password,
    })
    const user = await getUser(validatedFormData.email)
    if (user) return { message: `User already exists` }
    console.log(user)
    const newUser = await createUser({
      name: validatedFormData.name,
      email: validatedFormData.email,
      password: validatedFormData.password,
    })
    if (!newUser) {
      return { message: `failed to create user` }
    } else {
      await signIn(`credentials`, {
        email: validatedFormData.email,
        password: validatedFormData.password,
      })
      return {
        message: `user created`,
      }
    }
  } catch (err) {
    if (err instanceof ZodError) {
      return {
        message: `invalid data`,
      }
    }
    return { message: `failed to create user` }
  }
}

export async function loginUser(
  _: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  try {
    const email = formData.get(`email`)
    const password = formData.get(`password`)
    const validatedFormData = await loginSchema.parseAsync({ email, password })
    await signIn(`credentials`, {
      email: validatedFormData.email,
      password: validatedFormData.password,
    })
    return {
      message: `user logged_in`,
    }
  } catch (err) {
    if (err instanceof ZodError) {
      return {
        message: `invalid data`,
      }
    }
    return { message: `failed to login user` }
  }
}

export async function updateNFTDataAction(
  formData: FormData,
  verified: boolean
) {
  const chain = formData.get('chain')?.toString()
  const tokenId = formData.get('token_id')?.toString()
  const address = formData.get('address')?.toString()
  const walletId = formData.get('wallet_id')?.toString()
  if (!chain || !tokenId || !address || !walletId) return
  return await updateNFTData(chain, tokenId, address, verified, walletId)
}

export async function updateNFTCollectionDataAction(formData: FormData) {
  const name = formData.get('name')?.toString()
  const address = formData.get('address')?.toString()
  const walletId = formData.get('wallet_id')?.toString()
  if (!name || !address || !walletId) return
  return await updateNFTCollectionData(name, address, walletId)
}

export async function updateNFTAnalysisAction(
  formData: FormData,
  verified: boolean
) {
  const name = formData.get('name')?.toString()
  const imageURL = formData.get('image_url')?.toString()
  const collection = formData.get('collection')?.toString()
  const userId = formData.get('user_id')?.toString()
  if (!name || !imageURL || !collection || !userId) return
  return await updateNFTAnalysis(name, imageURL, collection, verified, userId)
}

export async function getSimilarImage(formData: FormData) {
  return withTryCatch(async () => {
    const data = await ApiClient<NFTResponse>(
      ``,
      {
        method: `POST`,
        body: formData,
      },
      {
        apiURL: `https://api-cdv.unleashnfts.com/api/v1/nft/image/detect-counterfiet`,
      }
    )
    const { nfts } = data
    const _nfts = nfts?.slice(0, 3)
    const modifiedNftsData = await Promise.all(
      _nfts?.map(async nft => {
        const blockchain = nft.metadata.chain_id
        const address = nft.metadata.address
        const tokenID = nft.metadata.token_id
        const {
          metric_values: { similarity_category, similarity_score },
        } = nft

        const metadata = await getNFTMetadata(
          blockchain,
          address,
          tokenID,
          similarity_score,
          similarity_category
        )

        return metadata
      }) ?? []
    )
    return modifiedNftsData
  })
}

export async function getNFTCollectionMetadata(contractAddress: string) {
  return withTryCatch(async () => {
    const data = await ApiClient<NFTCollectionMetadata>(
      `nft/collection/metadata?contract_address=${contractAddress}`
    )
    const collection = data.data
    return collection
  })
}

export async function getNFTCollectionAnalytics(contractAddress: string) {
  return withTryCatch(async () => {
    const data = await ApiClient<NFTCollectionAnalytics>(
      `nft/collection/analytics?contract_address=${contractAddress}&sort_by=sales&time_range=all`
    )
    const collection = data.data
    return collection
  })
}

export async function getNFTCollectionProfile(
  blockchain: Blockchain,
  contractAddress: string
) {
  return withTryCatch(async () => {
    const data = await ApiClient<NFTCollectionProfile>(
      `nft/collection/profile?blockchain=${blockchain}&contract_address=${contractAddress}&sort_by=washtrade_index&time_range=all`
    )
    const collection = data.data
    return collection
  })
}
export async function getNFTCollectionHolders(
  blockchain: Blockchain,
  contractAddress: string
) {
  return withTryCatch(async () => {
    const data = await ApiClient<NFTCollectionHolders>(
      `nft/collection/holders?blockchain=${blockchain}&contract_address=${contractAddress}&sort_by=holders&time_range=all`
    )
    const collection = data.data
    return collection
  })
}

export async function getNFTCollectionScores(
  blockchain: Blockchain,
  contractAddress: string
) {
  return withTryCatch(async () => {
    const data = await ApiClient<NFTCollectionScores>(
      `nft/collection/scores?blockchain=${blockchain}&contract_address=${contractAddress}&sort_by=market_cap&time_range=all`
    )
    const collection = data.data
    return collection
  })
}

export async function getNFTCollectionTraders(
  blockchain: string,
  contractAddress: string
) {
  return withTryCatch(async () => {
    const data = await ApiClient<NFTCollectionTraders>(
      `nft/collection/traders?blockchain=${blockchain}&contract_address=${contractAddress}&sort_by=traders&time_range=all`
    )
    const collection = data.data
    return collection
  })
}

export async function getNFTCollectionWashtrade(
  blockchain: Blockchain,
  contractAddress: string
) {
  return withTryCatch(async () => {
    const data = await ApiClient<NFTCollectionWashtrade>(
      `nft/collection/washtrade?blockchain=${blockchain}&contract_address=${contractAddress}&sort_by=washtrade_assets&time_range=all`
    )
    const collection = data.data
    return collection
  })
}

export async function getNFTCollectionWhales(
  blockchain: Blockchain,
  contractAddress: string
) {
  return withTryCatch(async () => {
    const data = await ApiClient<NFTCollectionWhales>(
      `nft/collection/whales?blockchain=${blockchain}&contract_address=${contractAddress}&sort_by=nft_count&time_range=all`
    )
    const collection = data.data
    return collection
  })
}

export async function getComputedNFTCollectionMetadata(
  blockchain: Blockchain,
  contractAddress: string
): Promise<NFTCollectionData> {
  const metadata = validateOrThrow(
    await getNFTCollectionMetadata(contractAddress),
    'collection metadata'
  )
  const analytics = validateOrThrow(
    await getNFTCollectionAnalytics(contractAddress),
    'collection analytics'
  )
  const profile = validateOrThrow(
    await getNFTCollectionProfile(blockchain, contractAddress),
    'collection profile'
  )
  const scores = validateOrThrow(
    await getNFTCollectionScores(blockchain, contractAddress),
    'collection scores'
  )
  const traders = validateOrThrow(
    await getNFTCollectionTraders(blockchain, contractAddress),
    'collection traders'
  )
  const whales = validateOrThrow(
    await getNFTCollectionWhales(blockchain, contractAddress),
    'collection whales'
  )
  const washtrade = validateOrThrow(
    await getNFTCollectionWashtrade(blockchain, contractAddress),
    'collection washtrade'
  )
  const holders = validateOrThrow(
    await getNFTCollectionHolders(blockchain, contractAddress),
    'collection holders'
  )

  return {
    metadata,
    analytics,
    profile,
    scores,
    traders,
    whales,
    washtrade,
    holders,
  }
}

export async function getNFTWalletProfile(wallet: string) {
  return withTryCatch(async () => {
    const data = await ApiClient<WalletProfile>(
      `nft/wallet/profile?wallet=${wallet}`
    )
    const collection = data.data
    return collection
  })
}

export async function getNFTHolders(
  blockChain: string,
  contractAddress: string,
  tokenID: string
) {
  return withTryCatch(async () => {
    const data = await ApiClient<NFTHolders>(
      `nft/holders?blockchain=${blockChain}&contract_address=${contractAddress}&token_id=${tokenID}&time_range=all&sort_by=past_owners_count`
    )
    const collection = data.data
    return collection
  })
}

export async function getNFTAnalytics(
  blockchain: string,
  contractAddress: string,
  tokenID: string
) {
  return withTryCatch(async () => {
    const data = await ApiClient<NFTAnalytics>(
      `nft/analytics?blockchain=${blockchain}&contract_address=${contractAddress}&token_id=${tokenID}&time_range=all&sort_by=sales`
    )
    const collection = data.data
    return collection
  })
}
export async function getNFTTopDeals() {
  return withTryCatch(async () => {
    const data = await ApiClient<NFTTopDeals>(
      `nft/top_deals?sort_by=deal_score&sort_order=desc&offset=0&limit=18`
    )
    const collection = data.data
    return collection
  })
}

export async function getWalletNFTBalance(wallet: string) {
  return withTryCatch(async () => {
    const data = await ApiClient<WalletNFTBalance>(
      `wallet/balance/nft?wallet=${wallet}&time_range=all`
    )
    const collection = data.data
    return collection
  })
}
export async function getERC20TokenBalance(wallet: string) {
  return withTryCatch(async () => {
    const data = await ApiClient<TokenBalance>(
      `wallet/balance/nft?wallet=${wallet}&time_range=all`
    )
    const collection = data.data
    return collection
  })
}

export async function getTokenBalance(
  blockchain: string,
  tokenAddress: string,
  wallet: string
) {
  return withTryCatch(async () => {
    const data = await ApiClient<TokenBalance>(
      `token/balance?blockchain=${blockchain}&token_address=${tokenAddress}&address=${wallet}`
    )
    const collection = data.data
    return collection
  })
}

export async function getNFTTransactions(blockchain: string, address: string) {
  return withTryCatch(async () => {
    const data = await ApiClient<NFTTransactions>(
      `nft/transactions?blockchain=${blockchain}&contract_address=${address}&time_range=90d`
    )
    const collection = data.data
    return collection
  })
}

export async function getNFTTraders(blockchain: string, address: string) {
  return withTryCatch(async () => {
    const data = await ApiClient<NFTTraders>(
      `nft/traders?blockchain=${blockchain}&contract_address=${address}&&time_range=all&sort_by=traders`
    )
    const collection = data.data
    return collection
  })
}

export async function getNFTScores(blockchain: string, address: string) {
  return withTryCatch(async () => {
    const data = await ApiClient<NFTScores>(
      `nft/scores?blockchain=${blockchain}&contract_address=${address}&time_range=all&sort_by=price_ceiling`
    )
    const collection = data.data
    return collection
  })
}

export async function getNFTMetadataByTokenID(
  blockchain: number,
  address: string,
  tokenID: string
) {
  return withTryCatch(async () => {
    const data = await ApiClient<NFTMetadata | DataNotFound>(
      ``,
      {},
      {
        apiURL: `https://api.unleashnfts.com/api/v1/nft/${blockchain}/${address}/${tokenID}`,
      }
    )
    if (!('error' in data)) return data
  })
}

export async function getNFTTraits(
  blockchainID: number,
  address: string,
  tokenID: string
) {
  return withTryCatch(async () => {
    const data = await ApiClient<NFTTraits>(
      ``,
      {},
      {
        apiURL: `https://api.unleashnfts.com/api/v1/nft/${blockchainID}/${address}/${tokenID}/traits`,
      }
    )
    return data
  })
}

export async function getNFTMetadata(
  blockchain: number,
  address: string,
  tokenID: string,
  similarity_score?: {
    value: number
    unit: string
  },
  similarity_category?: {
    value: string
    unit: string
  }
): Promise<NFTData> {
  const metadata = validateOrThrow(
    await getNFTMetadataByTokenID(blockchain, address, tokenID),
    'metadata'
  )
  const analytics = validateOrThrow(
    await getNFTAnalytics(getNetworkName(blockchain), address, tokenID),
    'analytics'
  )

  const scores = validateOrThrow(
    await getNFTScores(getNetworkName(blockchain), address),
    'scores'
  )

  const holders = validateOrThrow(
    await getNFTHolders(getNetworkName(blockchain), address, tokenID),
    'holders'
  )

  const transactions = validateOrThrow(
    await getNFTTransactions(getNetworkName(blockchain), address),
    'transactions'
  )

  const traders = validateOrThrow(
    await getNFTTraders(getNetworkName(blockchain), address),
    'traders'
  )

  const traits = validateOrThrow(
    await getNFTTraits(blockchain, address, tokenID),
    'traits'
  )

  return {
    metadata,
    ...(similarity_category && { similarity_category }),
    ...(similarity_score && { similarity_score }),
    analytics,
    scores,
    holders,
    transactions,
    traders,
    traits,
  }
}

export async function processNFTQueryWithEmbeddings(
  prevState: any,
  formData: FormData
) {
  const GEMINI_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY
  if (!GEMINI_API_KEY) throw new Error('Gemini API Key is missing')

  const prompt = formData.get('prompt')?.toString()
  if (!prompt) throw new Error('User prompt missing')

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

  await rateLimit('geminiAPI')
  const embeddingModel = genAI.getGenerativeModel({
    model: 'text-embedding-004',
  })
  const queryEmbeddingResult = await embeddingModel.embedContent(prompt)
  const queryVector = queryEmbeddingResult.embedding.values

  const queryResponse = await index.query({
    vector: queryVector,
    topK: 12,
    includeMetadata: true,
  })

  if (!queryResponse.matches?.length) {
    return null
  }

  const matches = queryResponse.matches.map(match => ({
    nft: match.metadata,
    similarity: match.score || 0,
  }))

  const threshold = computeDynamicThreshold(matches)
  const sortedResults = matches
    .filter(({ similarity }) => similarity > threshold)
    .sort((a, b) => b.similarity - a.similarity)
    .map(({ nft }) => nft)

  return sortedResults ?? null
}
