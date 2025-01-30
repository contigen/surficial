import 'server-only'
import prisma from './prisma'
import { genSaltSync, hashSync } from 'bcrypt-ts'
import { withTryCatch } from './utils'

type CreateUser = {
  name: string
  email: string
  password: string
}

export function createUser({ name, email, password }: CreateUser) {
  return withTryCatch(() => {
    const salt = genSaltSync(10)
    const hashedPassword = hashSync(password, salt)

    const user = prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    })
    console.log('User Created:', user)
    return user
  })
}

export function getUser(email: string) {
  return withTryCatch(() => {
    return prisma.user.findUnique({ where: { email } })
  })
}

export async function updateNFTData(
  chain: string,
  tokenId: string,
  address: string,
  verified: boolean,
  walletId: string
) {
  return withTryCatch(async () => {
    return await prisma.nFT.create({
      data: {
        chain,
        tokenId,
        address,
        walletId,
        status: verified ? 'VERIFIED' : 'UNVERIFIED',
      },
    })
  })
}

export async function updateNFTCollectionData(
  name: string,
  address: string,
  walletId: string
) {
  return withTryCatch(async () => {
    return await prisma.nFTCollection.create({
      data: {
        name,
        address,
        walletId,
      },
    })
  })
}

export async function updateNFTAnalysis(
  name: string,
  imageURL: string,
  collection: string,
  verified: boolean,
  userId: string
) {
  return withTryCatch(async () => {
    return await prisma.nFTAnalysis.create({
      data: {
        name,
        imageURL,
        collection,
        userId,
        status: verified ? 'VERIFIED' : 'UNVERIFIED',
      },
    })
  })
}

export async function getNFTStats(userId: string) {
  return withTryCatch(async () => {
    return await Promise.all([
      prisma.nFT.count({
        where: { wallet: { userId } },
      }),
      prisma.nFT.count({
        where: { wallet: { userId }, status: 'VERIFIED' },
      }),
      prisma.nFT.count({
        where: { wallet: { userId }, status: 'SUSPICIOUS' },
      }),
      prisma.nFTCollection.count({
        where: { wallet: { userId } },
      }),
    ])
  })
}

export async function getNFTAnalysis(userId: string) {
  return withTryCatch(async () => {
    return await prisma.nFTAnalysis.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
        imageURL: true,
        collection: true,
        status: true,
      },
    })
  })
}

export async function addWalletToUser(userId: string, walletAddress: string) {
  return withTryCatch(async () => {
    return await prisma.wallet.upsert({
      where: { address: walletAddress },
      update: {},
      create: {
        address: walletAddress,
        userId,
      },
    })
  })
}
