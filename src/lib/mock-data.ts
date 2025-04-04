import { NFTData } from '&/types'

export const mockNFTs: NFTData[] = [
  {
    metadata: {
      name: 'Otherdeed #63545',
      collection_name: 'Otherdeed',
      address: '0x34d85c9cdeb23fa97cb08333b511ac86e1c4e258',
      token_id: '63545',
      chain_id: 1,
      minted_date: '2022-05-01T01:48:27Z',
      token_image_url:
        'https://assets.otherside.xyz/otherdeeds/fd08fda6c6845a41cc269005c1318669dd7d999d325d30c94fa5a28580c5ff90.jpg',
      thumbnail_url:
        'https://assets.otherside.xyz/otherdeeds/fd08fda6c6845a41cc269005c1318669dd7d999d325d30c94fa5a28580c5ff90.jpg',
      thumbnail_palette: ['#CC6AB5', '#0064C2', '#D0EBFF', '#E03131'],
      verified: false,
      rarity_score: 100392.945,
      rarity_rank: 10309,
      social_media: [
        { platform: 'twitter', url: 'https://twitter.com/othersidemeta' },
        { platform: 'discord', url: 'https://discord.gg/the-otherside' },
      ],
      price_latest: { value: '41309.05', unit: 'usd' },
      price_fair_estimate: { value: '0.42743993', unit: 'usd' },
      hold_time_current: 989,
      owned_by: '0x5ea6795cd549b65fc299d297bc98720980ef76ce',
      past_owner_count: 3,
    },
    analytics: [
      {
        assets: 1,
        sales: 40,
        transactions: 31,
        transfers: 80,
        volume: 4717.986370270762,
        volume_change: 0.3573878869276881,
      },
    ],
    scores: [
      {
        estimated_price: 41309.05,
        rarity_rank: 10309,
        rarity_score: 100392.945,
        washtrade_status: 'false',
      },
    ],
    transactions: [
      {
        transaction_type: 'mint',
        sale_price_usd: null,
        timestamp: '2022-05-01T01:48:27Z',
      },
    ],
    traders: [
      {
        traders: 3,
        traders_buyers: 2,
        traders_sellers: 2,
      },
    ],
    holders: [
      {
        holders: '1',
        past_owners_count: '2',
        hold_duration: '989',
      },
    ],
    traits: [{ trait_type: 'accessory', value: '1 attributes' }],
  },
]

const mockCollections = [
  {
    metadata: {
      collection: 'Bored Ape Yacht Club',
      brand: 'Yuga Labs',
      image_url:
        'https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?w=500&auto=format',
      banner_image_url:
        'https://i.seadn.io/gae/i5dYZRkVCUK97bfprQ3WXyrT9BnLSZtVKGJlKQ6VvrWMBQAP16pTqd9Byx8tc3iXZAPijFzOUdDUH0bNp7vRTal8Xg4m7nALTsP8vQ?w=500&auto=format',
      blockchain: 'Ethereum',
      contract_type: 'ERC-721',
      category: 'Art',
      description:
        'The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain. Your Bored Ape doubles as your Yacht Club membership card, and grants access to members-only benefits, the first of which is access to THE BATHROOM, a collaborative graffiti board. Future areas and perks can be unlocked by the community through roadmap activation.',
      contract_created_date: '2021-04-22T00:00:00Z',
      discord_url: 'https://discord.gg/3P5K3dzgdB',
      twitter_url: 'https://twitter.com/BoredApeYC',
      instagram_url: 'https://www.instagram.com/boredapeyachtclub',
      medium_url: 'https://boredapeyachtclub.medium.com/',
      telegram_url: null,
    },
    analytics: {
      assets: 10000,
      assets_change: 0,
      sales: 5000,
      sales_change: 0.1,
      transactions: 15000,
      transactions_change: 0.05,
      volume: 500000,
      volume_change: 0.2,
      volume_trend: [400000, 450000, 480000, 500000, 520000, 550000],
      block_dates: [
        '2023-01-01',
        '2023-02-01',
        '2023-03-01',
        '2023-04-01',
        '2023-05-01',
        '2023-06-01',
      ],
    },
    profile: {
      collection_score: 95,
      holder_metrics_score: 90,
      liquidity_score: 85,
      market_dominance_score: 80,
      metadata_score: 95,
      token_distribution_score: 90,
      washtrade_index: 0.01,
    },
  },
  {
    metadata: {
      collection: 'CryptoPunks',
      brand: 'Larva Labs',
      image_url:
        'https://i.seadn.io/gae/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE?w=500&auto=format',
      banner_image_url:
        'https://i.seadn.io/gae/QB2kKuQEw04X02V9EoC2BNYZV652LYuewUv9ZdR7KJfI9Jocwmd28jIfsGg0umSCr2bOMV8O9UpLAkoaqfYwvwmC?w=500&auto=format',
      blockchain: 'Ethereum',
      contract_type: 'ERC-721',
      category: 'Collectibles',
      description:
        "CryptoPunks launched as a fixed set of 10,000 items in mid-2017 and became one of the inspirations for the ERC-721 standard. They have been featured in places like The New York Times, Christie's of London, Art|Basel Miami, and The PBS NewsHour.",
      contract_created_date: '2017-06-22T00:00:00Z',
      discord_url: null,
      twitter_url: 'https://twitter.com/cryptopunksnfts',
      instagram_url: null,
      medium_url: null,
      telegram_url: null,
    },
    analytics: {
      assets: 10000,
      assets_change: 0,
      sales: 8000,
      sales_change: 0.05,
      transactions: 20000,
      transactions_change: 0.03,
      volume: 750000,
      volume_change: 0.15,
      volume_trend: [600000, 650000, 700000, 725000, 740000, 750000],
      block_dates: [
        '2023-01-01',
        '2023-02-01',
        '2023-03-01',
        '2023-04-01',
        '2023-05-01',
        '2023-06-01',
      ],
    },
    profile: {
      collection_score: 98,
      holder_metrics_score: 95,
      liquidity_score: 92,
      market_dominance_score: 90,
      metadata_score: 97,
      token_distribution_score: 93,
      washtrade_index: 0.005,
    },
  },
]
