"use client"

import { Card, CardContent, CardHeader, CardTitle } from "&/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const mockActivityData = [
  { date: "2023-01", transactions: 5 },
  { date: "2023-02", transactions: 8 },
  { date: "2023-03", transactions: 12 },
  { date: "2023-04", transactions: 7 },
  { date: "2023-05", transactions: 15 },
  { date: "2023-06", transactions: 10 },
]

export function WalletActivity({ userData }: { userData: any }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Transaction Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="transactions" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>{/* Add transaction list here */}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Gas Usage</CardTitle>
          </CardHeader>
          <CardContent>{/* Add gas usage stats here */}</CardContent>
        </Card>
      </div>
    </div>
  )
}

