'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '&/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts'

const collectionGrowthData = [
  { name: 'Jan', collections: 20 },
  { name: 'Feb', collections: 25 },
  { name: 'Mar', collections: 30 },
  { name: 'Apr', collections: 35 },
  { name: 'May', collections: 45 },
  { name: 'Jun', collections: 50 },
]

const collectionHealthData = [
  { name: 'Collection A', healthy: 95, suspicious: 5 },
  { name: 'Collection B', healthy: 88, suspicious: 12 },
  { name: 'Collection C', healthy: 92, suspicious: 8 },
  { name: 'Collection D', healthy: 97, suspicious: 3 },
  { name: 'Collection E', healthy: 85, suspicious: 15 },
]

export function CollectionAnalytics() {
  return (
    <div className='grid gap-4 md:grid-cols-2'>
      <Card className='sublime-hover'>
        <CardHeader>
          <CardTitle>Collection Growth</CardTitle>
          <CardDescription>
            Number of new collections analyzed per month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart data={collectionGrowthData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Line type='monotone' dataKey='collections' stroke='#8884d8' />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className='sublime-hover'>
        <CardHeader>
          <CardTitle>Collection Health</CardTitle>
          <CardDescription>
            Percentage of healthy vs suspicious NFTs in top collections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={collectionHealthData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey='healthy'
                stackId='a'
                fill='#82ca9d'
                name='Healthy'
              />
              <Bar
                dataKey='suspicious'
                stackId='a'
                fill='#ffc658'
                name='Suspicious'
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
