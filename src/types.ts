import { MetaMaskInpageProvider } from '@metamask/providers'

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
  }
}

type Pagination = {
  pagination: {
    offset: number
    limit: number
    total_items: number
    has_next: boolean
  }
}

type NFT = {
  metadata: {
    token_id: string
    name: string
    collection_name: string
    chain_id: number
    minted_date: string // Use "string" for "NA"
    token_image_url: string
    thumbnail_url: string
    address: string
    thumbnail_palette: string[]
    verified: boolean
  }
  metric_values: {
    similarity_score: {
      value: number
      unit: string
    }
    similarity_category: {
      value: string // e.g., "Mildly Similar"
      unit: string
    }
  }
}

export type NFTResponse = {
  nfts: NFT[] | null
} & Pagination

export type NFTCollection = {
  data:
    | {
        banner_image_url: string | null
        blockchain: string
        brand: string
        category: string | null
        chain_id: string
        close_colours: string // Represents a stringified array of colours, e.g., "['#E6CC55', '#5050C4']"
        collection: string
        collection_id: string
        contract_address: string
        contract_created_date: string // ISO 8601 date string
        contract_type: string // e.g., "ERC721"
        description: string
        discord_url: string | null
        external_url: string | null
        image_url: string
        instagram_url: string | null
        marketplace_url: string | null
        medium_url: string | null
        telegram_url: string | null
        twitter_url: string | null
      }[]
    | null
} & Pagination

export type WalletProfile = {
  data:
    | {
        aml_association_level: string | null
        aml_hierarchy_link: string
        aml_is_sanctioned: boolean
        aml_risk_association_type: string
        aml_risk_inbound_volume: number | null
        aml_risk_level: string
        aml_risk_outbound_volume: number | null
        aml_total_inbound_volume: number | null
        aml_total_outbound_volume: number | null
        collection_count: number
        contract_creator: string
        is_contract: boolean
        is_custodial: boolean
        is_shark: boolean
        is_whale: boolean
        nft_count: number
        nft_marketplace_reward: Record<string, unknown> // Empty object, so using generic `Record`
        wallet: string
        washtrade_nft_count: number
      }[]
    | null
} & Pagination

export type NFTHolders = {
  data:
    | {
        blockchain: string // E.g., "ethereum"
        contract_address: string // Smart contract address
        flag: number // Indicates status or condition
        hold_duration: number // Duration in seconds or minutes (context-specific)
        holders: number // Count of current holders
        holders_change: number // Change in the number of holders
        max_date: string // ISO 8601 date string
        past_owners_count: number // Number of previous owners
        token_id: string // Token ID as a string
        wallet_holder_new: string[] // Array of wallet addresses for new holders
      }[]
    | null
} & Pagination

export type NFTAnalytics = {
  data:
    | {
        assets: number // Number of assets
        assets_change: number // Change in the number of assets
        blockchain: string // Blockchain name (e.g., "ethereum")
        chain_id: number // Chain ID (e.g., 1 for Ethereum mainnet)
        contract_address: string // Smart contract address
        flag: number // Status or condition flag
        floor_price: number | null // Floor price in a specific currency
        floor_price_eth: number | null // Floor price in ETH
        max_date: string // ISO 8601 date for the latest event
        sales: number // Total sales count
        sales_change: number // Change in sales count
        token_id: string // Token ID as a string
        transactions: number // Total number of transactions
        transactions_change: number // Change in transaction count
        transfers: number // Total number of transfers
        transfers_change: number // Change in transfer count
        volume: number // Total volume in a specific currency
        volume_change: number // Change in volume
      }[]
    | null
} & Pagination

export type WalletNFTBalance = {
  data:
    | {
        blockchain: string // Name of the blockchain (e.g., "ethereum")
        chain_id: string // Chain ID as a string (e.g., "1" for Ethereum mainnet)
        collection: string // Name of the NFT collection
        contract_address: string // Contract address of the NFT collection
        contract_type: string // Contract type (e.g., "ERC721")
        quantity: number // Quantity of the asset owned
        token_id: string // Token ID as a string
        wallet: string // Wallet address of the holder
      }[]
    | null
} & Pagination

export type TokenBalance = {
  data:
    | {
        address: string // Wallet address of the token holder
        blockchain: string // Blockchain (e.g., "ethereum")
        chain_id: number // Chain ID (e.g., 1 for Ethereum mainnet)
        decimal: number // Number of decimals for the token (0 means no decimals)
        quantity: number // Quantity of the token owned
        token_address: string // Contract address of the token
        token_name: string // Name of the token
        token_symbol: string // Symbol of the token
      }[]
    | null
} & Pagination

export type NFTCollectionAnalytics = {
  data: {
    assets: number
    assets_change: number
    assets_trend: number[]
    block_dates: string[]
    blockchain: string
    chain_id: number
    contract_address: string
    contract_created_date: string
    sales: number
    sales_change: number
    sales_trend: number[]
    transactions: number
    transactions_change: number
    transactions_trend: number[]
    transfers: number
    transfers_change: number
    transfers_trend: number[]
    updated_at: string
    volume: number
    volume_change: number
    volume_trend: number[]
  }[]
} & Pagination

export type NFTCollectionProfile = {
  data:
    | {
        avg_loss_making_trades: number
        avg_profitable_trades: number
        blockchain: string
        chain_id: number
        collection: string
        collection_score: number
        contract_address: string
        diamond_hands: string
        fear_and_greed_index: number
        holder_metrics_score: number
        liquidity_score: number
        loss_making_trades: string
        loss_making_trades_percentage: number
        loss_making_volume: number
        market_dominance_score: number
        metadata_score: number
        profitable_trades: string
        profitable_trades_percentage: number
        profitable_volume: number
        token_distribution_score: number
        washtrade_index: number
        zero_profit_trades: string
      }[]
    | null
} & Pagination
