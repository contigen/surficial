'use server'

import { ZodError } from 'zod'
import {
  ColorDescriptionSchema,
  loginSchema,
  NFTVisualDescription,
  registerSchema,
} from './lib/schema'
import { createUser, getUser } from './lib/db-queries'
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

async function getColorDescriptions(
  palette: string[],
  genAI: GoogleGenerativeAI
): Promise<string[]> {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: `You are a color analysis expert. For the given array of hex color codes, return an array of descriptive terms.
    
    Requirements:
    - Return ONLY a JSON array of strings
    - Each string should be a single word
    - Include both color names and qualities (e.g., "red", "bright", "dark")
    - Do not include any explanation, markdown, or additional text
    - Do not include quotes or backticks around the response
    
    Example input: ["#FF0000"]
    Example output: ["red","bright","vibrant"]`,
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: ColorDescriptionSchema,
    },
  })

  try {
    const result = await model.generateContent(JSON.stringify(palette))
    const response = result.response.text()
    return JSON.parse(response.replace(/'/g, `"`))
  } catch (e) {
    console.error('Error processing color descriptions:', e)
    return palette.map(() => 'colourful')
  }
}

async function getVisualDescriptions(
  imageURLs: string[],
  genAI: GoogleGenerativeAI
): Promise<string[]> {
  const systemInstruction = `You are a visual feature extraction model specialized in analyzing images and providing concise, descriptive terms. Given a URL to an NFT image (usually a small thumbnail or preview), your goal is to return a **detailed textual description** of what is visible in the image, focusing on key **visual elements** like objects, characters, style, mood, and notable visual features. 

Your description should be **specific**, **descriptive**, and **to the point**, avoiding generic terms like "image of" or "art." Ensure that the descriptions cover elements such as:
- Primary objects or characters (e.g., "a cartoon ape", "a spaceship")
- Key attributes of those objects (e.g., "wearing sunglasses", "with a glowing neon background")
- Visual style or mood (e.g., "retro", "dark and moody", "vibrant", "abstract")
- Any unique visual qualities (e.g., "with a holographic texture", "glowing elements")

**Requirements:**
- Only return **descriptive terms** and avoid extraneous explanations or any unnecessary text.
- Your response should be an array of **single sentence** or an array of **short list of words/phrases** for each image that adequately summarize each of the images you will be receiving
- Your descriptions should focus on **relevant visual features** for searching purposes and will be used in the indexing system.
- Please do **not** provide any explanations or meta-information about the image (e.g., "this image was generated by AI").
- Do not include any markdown, quotes, or backticks in the response.

### Example Input:
[NFT Image URL: "https://example.com/nft-image.jpg",
NFT Image URL2: "https://example.com/nft-image2.jpg"]

### Example Output:
["a cartoon ape wearing sunglasses, colorful graffiti background, playful, vibrant, with a futuristic touch", "second detailed description of another image"]

---

Please ensure that the generated visual description is concise, relevant, and focused on observable features in the image.`

  const imageResponses = await Promise.allSettled(
    imageURLs.map(async imageURL => {
      const mimeType = imageURL.endsWith('jpg')
        ? 'image/jpeg'
        : imageURL.endsWith('png')
        ? 'image/png'
        : ('image/webp' as const)
      const imageResp = await fetch(imageURL).then(res => res.arrayBuffer())
      return { imageResp, mimeType }
    })
  )
  const visionModel = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction,
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: NFTVisualDescription,
    },
  })
  try {
    const result = await visionModel.generateContent([
      ...imageResponses
        .filter(imageResp => imageResp.status === 'fulfilled')
        .map(imageResp => {
          const { imageResp: buffer, mimeType } = imageResp.value
          return {
            inlineData: {
              data: Buffer.from(buffer).toString('base64'),
              mimeType,
            },
          }
        }),
      'Generate a detailed visual description of these images',
    ])
    const response = result.response.text()
    console.log('result from vision model: ', response)
    return JSON.parse(response.replace(/'/g, `"`))
  } catch (err) {
    console.error('error from vision model', err)
    return Array(imageURLs.length).fill('')
  }
}

function createSearchableNFTText(
  nft: NFTTopDealItem[number],
  colorDescriptions: string[],
  visualDescription: string,
  traits: NFTTraits
): string {
  const nftTraits = traits.traits
  const priceRange = getPriceCategory(nft.listed_eth_price)
  const sentence =
    nftTraits.length > 0
      ? nftTraits
          ?.map(trait => `${trait.trait_type}: ${trait.value}`)
          .join(', ')
      : ''
  return [
    `Collection: ${nft.collection_name}`,
    `Token ID: ${nft.token_id}`,
    `Platform: ${nft.marketplace}`,
    `Blockchain: ${nft.chain_id === '1' ? 'Ethereum' : nft.chain_id}`,
    `Price: ${nft.listed_eth_price} ETH`,
    `Price category: ${priceRange}`,
    `Deal score: ${nft.deal_score}`,
    `Colors: ${colorDescriptions.join(', ')}`,
    `Visual Features: ${visualDescription}`,
    sentence ? `This character has the following traits: ${sentence}.` : ``,
    `Listed: ${new Date(nft.listing_timestamp).toISOString()}`,
    `Closing: ${new Date(nft.closing_timestamp).toISOString()}`,
  ].join(' ')
}

export async function processNFTQueryWithEmbeddings(
  prevState: any,
  formData: FormData
) {
  const GEMINI_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY
  if (!GEMINI_API_KEY) throw new Error(`Gemini API Key is missing`)

  const prompt = formData.get(`prompt`)?.toString()
  if (!prompt) throw new Error('User prompt missing')

  const _nftTopDeals = await getNFTTopDeals()
  if (!_nftTopDeals) return

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
  const embeddingModel = genAI.getGenerativeModel({
    model: 'text-embedding-004',
  })

  // Generate embedding for the user query

  const queryEmbeddingResult = await embeddingModel.embedContent(prompt)
  const queryEmbedding = queryEmbeddingResult.embedding.values // Access the values array

  // Process all NFTs' color palettes at once
  const ColorDescriptions = await getColorDescriptions(
    _nftTopDeals.flatMap(nft => nft.thumbnail_palette),
    genAI
  )

  const visualDescriptions = await getVisualDescriptions(
    _nftTopDeals.flatMap(nft => nft.thumbnail_url),
    genAI
  )

  console.log('visual descriptions, ', visualDescriptions.join(' '))

  const nftEmbeddings = await Promise.all(
    _nftTopDeals.map(async (nft, idx) => {
      const nftTraits = await getNFTTraits(
        +nft.chain_id,
        nft.contract_address,
        nft.token_id
      )
      const startIdx = idx * nft.thumbnail_palette.length
      const nftColorDescriptions = ColorDescriptions.slice(
        startIdx,
        startIdx + nft.thumbnail_palette.length
      )

      const searchableText = createSearchableNFTText(
        nft,
        nftColorDescriptions,
        visualDescriptions[idx],
        nftTraits ?? { traits: [] }
      )
      const embeddingResult = await embeddingModel.embedContent(searchableText)
      return {
        nft,
        embedding: embeddingResult.embedding.values,
      }
    })
  )

  const similarityScores = nftEmbeddings.map(nftEmb => ({
    nft: nftEmb.nft,
    similarity: cosineSimilarity(queryEmbedding, nftEmb.embedding),
  }))

  const threshold = computeDynamicThreshold(similarityScores)
  const sortedResults = similarityScores
    .filter(({ similarity }) => similarity > threshold)
    .sort((a, b) => b.similarity - a.similarity)
    .map(({ nft }) => nft)

  return sortedResults ?? null
}
