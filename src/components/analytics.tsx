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

const barChartData = [
  { name: 'Jan', Authentic: 400, Suspicious: 240, Fraudulent: 20 },
  { name: 'Feb', Authentic: 300, Suspicious: 139, Fraudulent: 15 },
  { name: 'Mar', Authentic: 200, Suspicious: 980, Fraudulent: 30 },
  { name: 'Apr', Authentic: 278, Suspicious: 390, Fraudulent: 18 },
  { name: 'May', Authentic: 189, Suspicious: 480, Fraudulent: 25 },
  { name: 'Jun', Authentic: 239, Suspicious: 380, Fraudulent: 22 },
]

const pieChartData = [
  { name: 'Authentic', value: 400 },
  { name: 'Suspicious', value: 300 },
  { name: 'Fraudulent', value: 30 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export function Analytics() {
  return (
    <div className='grid gap-4 md:grid-cols-2'>
      <Card className='sublime-hover'>
        <CardHeader>
          <CardTitle>NFT Analysis Trends</CardTitle>
          <CardDescription>
            Monthly breakdown of NFT authenticity analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='Authentic' fill='#0088FE' />
              <Bar dataKey='Suspicious' fill='#00C49F' />
              <Bar dataKey='Fraudulent' fill='#FF8042' />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className='sublime-hover'>
        <CardHeader>
          <CardTitle>Overall NFT Distribution</CardTitle>
          <CardDescription>
            Breakdown of NFT authenticity status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width='100%' height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx='50%'
                cy='50%'
                labelLine={false}
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'
              >
                {pieChartData.map((entry, index) => (
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
    </div>
  )
}
