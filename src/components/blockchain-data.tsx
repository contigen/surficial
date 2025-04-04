'use client'

import { Card, CardContent, CardHeader, CardTitle } from '&/components/ui/card'
import { Badge } from '&/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '&/components/ui/table'

type BlockchainDataProps = {
  userData: {
    nfts: any[]
    [key: string]: any
  } | null
}

export function BlockchainData({ userData }: BlockchainDataProps) {
  if (!userData) {
    return <div>No blockchain data available</div>
  }

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Chain Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Chain</TableHead>
                <TableHead>Contract Type</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Ethereum</TableCell>
                <TableCell>
                  {userData.nfts[0]?.contract_type || 'N/A'}
                </TableCell>
                <TableCell>
                  <Badge>Active</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className='grid gap-4 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Contract Interactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contract</TableHead>
                  <TableHead>Interactions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userData.nfts.map((nft: any, index: number) => (
                  <TableRow
                    key={`${nft.metadata.address}-${nft.metadata.token_id}-${index}`}
                  >
                    <TableCell className='font-mono'>
                      {nft.metadata.address.slice(0, 6)}...
                      {nft.metadata.address.slice(-4)}
                    </TableCell>
                    <TableCell>
                      <Badge variant='outline'>
                        {nft.analytics.transactions}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Network Statistics</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex justify-between items-center'>
              <span className='text-sm text-muted-foreground'>
                Average Gas Used
              </span>
              <Badge variant='secondary'>123,456</Badge>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-sm text-muted-foreground'>
                Total Transactions
              </span>
              <Badge variant='secondary'>89</Badge>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-sm text-muted-foreground'>
                Unique Contracts
              </span>
              <Badge variant='secondary'>12</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
