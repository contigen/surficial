import { MetaMaskInpageProvider } from '@metamask/providers'
import { FixedNumber } from 'ethers'

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
  }
}

export type stateField<T> = {
  [K in keyof T]: {
    [P in K]: T[P]
  }
}[keyof T]

export type Blockchain =
  | 'ethereum'
  | 'polygon'
  | 'binance'
  | 'avalanche'
  | 'linea'
  | 'solana'
  | 'bitcoin'

type Pagination = {
  pagination: {
    offset: number
    limit: number
    total_items: number
    has_next: boolean
  }
}

type NFTImageSearch = {
  metadata: {
    token_id: string
    name: string
    collection_name: string
    chain_id: number
    minted_date: string
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
      value: string
      unit: string
    }
  }
}

export type DataNotFound = {
  status_code: number
  custom_code: number
  error: 'data_not_found'
  message: 'No data found.'
}

export type NFTResponse = {
  nfts: NFTImageSearch[] | null
} & Pagination

export type NFTCollectionMetadata = {
  data:
    | {
        banner_image_url: string | null
        blockchain: string
        brand: string
        category: string | null
        chain_id: string
        close_colours: string
        collection: string
        collection_id: string
        contract_address: string
        contract_created_date: string
        contract_type: string
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
        nft_marketplace_reward: Record<string, unknown>
        wallet: string
        washtrade_nft_count: number
      }[]
    | null
} & Pagination

export type NFTHolders = {
  data:
    | {
        blockchain: string
        contract_address: string
        flag: number
        hold_duration: number
        holders: number
        holders_change: number
        max_date: string
        past_owners_count: number
        token_id: string
        wallet_holder_new: string[]
      }[]
    | null
} & Pagination

export type NFTAnalytics = {
  data:
    | {
        assets: number
        assets_change: number
        blockchain: string
        chain_id: number
        contract_address: string
        flag: number
        floor_price: number | null
        floor_price_eth: number | null
        max_date: string
        sales: number
        sales_change: number
        token_id: string
        transactions: number
        transactions_change: number
        transfers: number
        transfers_change: number
        volume: number
        volume_change: number
      }[]
    | null
} & Pagination

export type WalletNFTBalance = {
  data:
    | {
        blockchain: string
        chain_id: string
        collection: string
        contract_address: string
        contract_type: string
        quantity: number
        token_id: string
        wallet: string
      }[]
    | null
} & Pagination

export type TokenBalance = {
  data:
    | {
        address: string
        blockchain: string
        chain_id: number
        decimal: number
        quantity: number
        token_address: string
        token_name: string
        token_symbol: string
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

export type NFTCollectionHolders = {
  data: {
    block_dates: string[]
    blockchain: string
    chain_id: number
    contract_address: string
    holders: string
    holders_change: string
    holders_tokens_1: string
    holders_tokens_10_15: string
    holders_tokens_10_15_trend: number[]
    holders_tokens_16_25: string
    holders_tokens_16_25_trend: number[]
    holders_tokens_1_trend: number[]
    holders_tokens_2: string
    holders_tokens_25plus: string
    holders_tokens_25plus_trend: number[]
    holders_tokens_2_trend: number[]
    holders_tokens_3_5: string
    holders_tokens_3_5_trend: number[]
    holders_tokens_6_9: string
    holders_tokens_6_9_trend: number[]
    holders_tokens_9plus: string
    holders_tokens_9plus_trend: number[]
    total_holder_trend: string
  }[] &
    Pagination
}

export type NFTCollectionScores = {
  data:
    | {
        avg_usd_trend: string
        block_dates: string[]
        blockchain: string
        contract_address: string
        market_cap: string
        marketcap_change: string
        marketcap_trend: string
        minting_revenue: number
        price_avg: string
        price_avg_change: string
        price_ceiling: number
        price_ceiling_trend: string
        royalty_price: string
      }[]
    | null
} & Pagination

export type NFTCollectionTraders = {
  data: {
    block_dates: string[]
    blockchain: Blockchain
    chain_id: 1
    contract_address: string
    traders: number
    traders_buyers: number
    traders_buyers_change: number | null
    traders_buyers_trend: number[]
    traders_change: number | null
    traders_sellers: number
    traders_sellers_change: number | null
    traders_sellers_trend: number[]
    traders_trend: number[]
  }[]
} & Pagination

export type NFTCollectionWashtrade = {
  data: {
    block_dates: string[]
    blockchain: Blockchain
    chain_id: number
    contract_address: string
    washtrade_assets: number
    washtrade_assets_change: number | null
    washtrade_assets_trend: string[]
    washtrade_suspect_sales: number
    washtrade_suspect_sales_change: number | null
    washtrade_suspect_sales_trend: number[]
    washtrade_suspect_transactions_trend: number[]
    washtrade_volume: number
    washtrade_volume_change: number | null
    washtrade_volume_trend: number[]
    washtrade_wallets: number
    washtrade_wallets_change: number | null
    washtrade_wallets_trend: number[]
  }[]
} & Pagination

export type NFTCollectionCategories = {}

export type NFTCollectionWhales = {
  data:
    | {
        blockchain: string
        buy_count: string
        buy_volume: number
        buy_whales: string
        chain_id: number
        collection: string
        contract_address: string
        contract_type: string
        mint_count: string
        mint_volume: number
        mint_whales: string
        nft_count: string
        sell_count: string
        sell_volume: number
        sell_whales: string
        total_mint_volume: number
        total_sale_volume: number
        unique_buy_wallets: string
        unique_mint_wallets: string
        unique_sell_wallets: string
        unique_wallets: string
        whale_holders: string
      }[]
    | null
} & Pagination

export type NFTTopDeals = {
  data:
    | {
        chain_id: string
        closing_timestamp: string
        collection_name: string
        contract_address: string
        deal_score: number
        estimated_eth_price: number
        listed_eth_price: number
        listing_timestamp: string
        marketplace: string
        thumbnail_palette: string[]
        thumbnail_url: string
        token_id: string
      }[]
    | null
} & Pagination

export type NFTTopDealItem = NonNullable<NFTTopDeals['data']>

// NFT View data

export type NFTMetadata = {
  name: string
  collection_name: string
  address: string
  token_id: string
  chain_id: number
  minted_date: string
  token_image_url: string
  thumbnail_url: string
  thumbnail_palette: string[]
  verified: boolean
  rarity_score: number
  rarity_rank: number
  social_media: Array<{ platform: string; url: string }>
  price_latest: { value: string; unit: string }
  price_fair_estimate: { value: string; unit: string }
  hold_time_current: number
  owned_by: string
  past_owner_count: number
}

export type NFTScores = {
  data:
    | {
        all_time_low: number
        blockchain: string
        chain_id: number
        contract_address: string
        estimated_price: number | null
        max_price: number
        price: number
        price_ceiling: number
        rarity_rank: number
        rarity_score: number
        start_price: number
        token_id: string
        washtrade_status: string
      }[]
    | null
} & Pagination

export type NFTTransactions = {
  data:
    | {
        block_date: string
        blockchain: string
        chain_id: number
        collection: string
        contract_address: string
        contract_created_date: string
        contract_type: 'ERC721' | 'ERC1155' | string
        hash: string
        is_washtrade: string
        marketplace: string | null
        receiving_address: string
        sale_price_usd: number | null
        sending_address: string
        timestamp: string
        token_id: string
        transaction_type: 'mint' | 'transfer' | 'sale' | string
      }[]
    | null
} & Pagination

export type NFTTraders = {
  data:
    | {
        blockchain: string
        chain_id: number
        contract_address: string
        flag: number
        max_date: string
        token_id: string
        traders: number
        traders_buyers: number
        traders_buyers_change: number
        traders_change: number
        traders_ratio: number
        traders_ratio_change: number
        traders_sellers: number
        traders_sellers_change: FixedNumber
      }[]
    | null
} & Pagination

export type NFTTraits = {
  traits: {
    trait_type: string
    value: string
  }[]
}

export type NFTData = {
  metadata: NFTMetadata
  similarity_score?: { value: number; unit: string }
  similarity_category?: { value: string; unit: string }
  analytics: NonNullable<NFTAnalytics['data']>
  scores: NonNullable<NFTScores['data']>
  transactions: NonNullable<NFTTransactions['data']>
  traders: NonNullable<NFTTraders['data']>
  holders: NonNullable<NFTHolders['data']>
  traits: NFTTraits
}

export type NFTCollectionData = {
  metadata: NonNullable<NFTCollectionMetadata['data']>
  analytics: NonNullable<NFTCollectionAnalytics['data']>
  profile: NonNullable<NFTCollectionProfile['data']>
  scores: NonNullable<NFTCollectionScores['data']>
  traders: NonNullable<NFTCollectionTraders['data']>
  whales: NonNullable<NFTCollectionWhales['data']>
  washtrade: NonNullable<NFTCollectionWashtrade['data']>
  holders: NonNullable<NFTCollectionHolders['data']>
}
