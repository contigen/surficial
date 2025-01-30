"use client"

import { Card, CardContent, CardHeader, CardTitle } from "&/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export function UserStats({ userData }: { userData: any }) {
  const portfolioData = [
    { name: "NFTs", value: userData.stats.totalNFTs },
    { name: "Collections", value: userData.stats.totalCollections },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Average Hold Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127 days</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Most Active Chain</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Ethereum</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

