import { object, string, z } from 'zod'
import { SchemaType } from '@google/generative-ai'

export const loginSchema = object({
  email: string({ required_error: 'Email is required' })
    .min(1, `Email is required`)
    .email(`Invalid email`),
  password: string({ required_error: 'Password is required' })
    .min(1, `Password is required`)
    .min(4, `Password must be more than 4 characters`),
})

export const registerSchema = loginSchema.merge(
  object({
    name: string({ required_error: `Name is required` }).min(
      1,
      `Name must not be empty`
    ),
  })
)

export const ColorDescriptionSchema = {
  description: 'Array of color description strings',
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.STRING,
    description: 'Color description or quality (e.g., "red", "bright", "dark")',
  },
}
export const NFTResponseSchema = {
  description: 'List of NFTs',
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      chain_id: {
        type: SchemaType.STRING,
        description: 'Blockchain chain ID where the NFT is listed',
        nullable: false,
      },
      closing_timestamp: {
        type: SchemaType.STRING,
        description: 'Timestamp when the listing closes',
        nullable: false,
      },
      collection_name: {
        type: SchemaType.STRING,
        description: 'Name of the NFT collection',
        nullable: false,
      },
      contract_address: {
        type: SchemaType.STRING,
        description: 'Smart contract address of the NFT',
        nullable: false,
      },
      deal_score: {
        type: SchemaType.NUMBER,
        description: 'Score indicating the attractiveness of the deal',
        nullable: false,
      },
      estimated_eth_price: {
        type: SchemaType.NUMBER,
        description: 'Estimated Ethereum price of the NFT',
        nullable: false,
      },
      listed_eth_price: {
        type: SchemaType.NUMBER,
        description: 'Listed Ethereum price of the NFT',
        nullable: false,
      },
      listing_timestamp: {
        type: SchemaType.STRING,
        description: 'Timestamp when the NFT was listed',
        nullable: false,
      },
      marketplace: {
        type: SchemaType.STRING,
        description: 'Marketplace where the NFT is listed',
        nullable: false,
      },
      thumbnail_palette: {
        type: SchemaType.ARRAY,
        description: 'Array of hex color codes representing the palette',
        items: {
          type: SchemaType.STRING,
        },
        nullable: false,
      },
      thumbnail_url: {
        type: SchemaType.STRING,
        description: 'URL of the NFT thumbnail image',
        nullable: false,
      },
      token_id: {
        type: SchemaType.STRING,
        description: 'Unique token ID of the NFT',
        nullable: false,
      },
    },
    required: [
      'chain_id',
      'closing_timestamp',
      'collection_name',
      'contract_address',
      'deal_score',
      'estimated_eth_price',
      'listed_eth_price',
      'listing_timestamp',
      'marketplace',
      'thumbnail_palette',
      'thumbnail_url',
      'token_id',
    ],
  },
}

export const NFTVisualDescription = {
  description: 'visual descriptions of the supplied images',
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.STRING,
  },
}
