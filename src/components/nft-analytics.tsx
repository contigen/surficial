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
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'

const similarityData = [
  { name: 'Unique', value: 6000 },
  { name: 'Slightly Similar', value: 3000 },
  { name: 'Moderately Similar', value: 800 },
  { name: 'Highly Similar', value: 200 },
]

const monthlyAnalysisData = [
  { name: 'Jan', analyzed: 800, verified: 700, suspicious: 100 },
  { name: 'Feb', analyzed: 1000, verified: 850, suspicious: 150 },
  { name: 'Mar', analyzed: 1200, verified: 1000, suspicious: 200 },
  { name: 'Apr', analyzed: 900, verified: 750, suspicious: 150 },
  { name: 'May', analyzed: 1500, verified: 1300, suspicious: 200 },
  { name: 'Jun', analyzed: 1800, verified: 1600, suspicious: 200 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export function NFTAnalytics() {
  return (
    <div className='grid gap-4 md:grid-cols-2'>
      <Card className='sublime-hover'>
        <CardHeader>
          <CardTitle>NFT Similarity Distribution</CardTitle>
          <CardDescription>
            Breakdown of NFT similarities based on analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie
                data={similarityData}
                cx='50%'
                cy='50%'
                labelLine={false}
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'
              >
                {similarityData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className='sublime-hover'>
        <CardHeader>
          <CardTitle>Monthly Analysis Trends</CardTitle>
          <CardDescription>
            NFTs analyzed, verified, and flagged as suspicious per month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={monthlyAnalysisData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='analyzed' fill='#8884d8' name='Analyzed' />
              <Bar dataKey='verified' fill='#82ca9d' name='Verified' />
              <Bar dataKey='suspicious' fill='#ffc658' name='Suspicious' />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
