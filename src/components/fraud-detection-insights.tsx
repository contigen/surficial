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

const fraudTypeData = [
  { name: 'Duplicate NFTs', value: 45 },
  { name: 'Copyright Infringement', value: 30 },
  { name: 'Misrepresentation', value: 15 },
  { name: 'Other', value: 10 },
]

const monthlyFraudData = [
  { name: 'Jan', reported: 50, confirmed: 30 },
  { name: 'Feb', reported: 65, confirmed: 40 },
  { name: 'Mar', reported: 60, confirmed: 35 },
  { name: 'Apr', reported: 80, confirmed: 50 },
  { name: 'May', reported: 75, confirmed: 45 },
  { name: 'Jun', reported: 90, confirmed: 55 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export function FraudDetectionInsights() {
  return (
    <div className='grid gap-4 md:grid-cols-2'>
      <Card className='sublime-hover'>
        <CardHeader>
          <CardTitle>Types of Reported Fraud</CardTitle>
          <CardDescription>
            Distribution of reported fraudulent activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie
                data={fraudTypeData}
                cx='50%'
                cy='50%'
                labelLine={false}
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'
              >
                {fraudTypeData.map((entry, index) => (
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
          <CardTitle>Monthly Fraud Reports</CardTitle>
          <CardDescription>
            Number of reported and confirmed fraudulent activities per month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={monthlyFraudData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='reported' fill='#8884d8' name='Reported' />
              <Bar dataKey='confirmed' fill='#82ca9d' name='Confirmed' />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
