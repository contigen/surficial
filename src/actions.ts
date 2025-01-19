'use server'

import { ZodError } from 'zod'
import { loginSchema, registerSchema } from './lib/schema'
import { createUser, getUser } from './lib/db-queries'
import { signIn } from './auth'
import { ApiClient } from './api/client'
import {
  NFTAnalytics,
  NFTCollection,
  NFTCollectionAnalytics,
  NFTCollectionProfile,
  NFTHolders,
  NFTResponse,
  TokenBalance,
  WalletNFTBalance,
  WalletProfile,
} from './types'
import { withTryCatch } from './lib/utils'

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
      `nft/image/detect-counterfiet`,
      {
        method: `POST`,
        body: formData,
      },
      `v1`
    )
    console.log(data)
    const { nfts } = data
    return nfts
  })
}

export async function getNFTMetadata() {
  // return aggregated data
}

export async function getNFTCollectionMetadata(contractAddress: string) {
  return withTryCatch(async () => {
    const data = await ApiClient<NFTCollection>(
      `nft/collection/metadata?contract_address=${contractAddress}`
    )
    const collection = data.data
    return collection
  })
}

export async function getNFTCollectionAnalytics(contractAddress: string) {
  return withTryCatch(async () => {
    const data = await ApiClient<NFTCollectionAnalytics>(
      `nft/collection/analytics?contract_address=${contractAddress}`
    )
    const collection = data.data
    return collection
  })
}

export async function getNFTCollectionProfile(contractAddress: string) {
  return withTryCatch(async () => {
    const data = await ApiClient<NFTCollectionProfile>(
      `nft/collection/profile?contract_address=${contractAddress}&time_range=all`
    )
    const collection = data.data
    return collection
  })
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

export async function getNFTHolders(contractAddress: string, tokenID: string) {
  return withTryCatch(async () => {
    const data = await ApiClient<NFTHolders>(
      `nft/holders?contract_address=${contractAddress}&token_id=${tokenID}&time_range=all`
    )
    const collection = data.data
    return collection
  })
}

export async function getNFTAnalytics(
  contractAddress: string,
  tokenID: string
) {
  return withTryCatch(async () => {
    const data = await ApiClient<NFTAnalytics>(
      `nft/analytics?contract_address=${contractAddress}&token_id=${tokenID}&time_range=all`
    )
    const collection = data.data
    return collection
  })
}

export async function getNFTSCores() {}
export async function getNFTWashTrade() {}

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

//  very important
export async function getNFTTransactions() {}
