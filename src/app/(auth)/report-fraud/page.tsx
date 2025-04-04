import { Button } from '&/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '&/components/ui/card'
import { Input } from '&/components/ui/input'
import { Label } from '&/components/ui/label'
import { Textarea } from '&/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '&/components/ui/select'
import { AlertTriangle, CheckCircle } from 'lucide-react'

export default function ReportFraudPage() {
  return (
    <div className='container mx-auto py-10'>
      <h1 className='text-4xl font-bold mb-6 sublime-text'>
        Report Fraudulent NFT
      </h1>
      <Card className='sublime-hover bg-background/80 backdrop-blur-sm'>
        <CardHeader>
          <CardTitle className='flex items-center'>
            <AlertTriangle className='mr-2 h-5 w-5 text-yellow-500' />
            Report Suspicious NFT Activity
          </CardTitle>
          <CardDescription>
            If you suspect an NFT of being fraudulent or involved in suspicious
            activity, please report it here. Your report will be reviewed by our
            team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className='space-y-6'>
            <div className='space-y-2'>
              <Label htmlFor='nftId'>NFT ID</Label>
              <Input id='nftId' placeholder='e.g., 63545' required />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='contractAddress'>Contract Address</Label>
              <Input
                id='contractAddress'
                placeholder='e.g., 0x34d85c9cdeb23fa97cb08333b511ac86e1c4e258'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='fraudType'>Type of Fraud</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder='Select fraud type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='duplicate'>Duplicate NFT</SelectItem>
                  <SelectItem value='copyright'>
                    Copyright Infringement
                  </SelectItem>
                  <SelectItem value='misrepresentation'>
                    Misrepresentation
                  </SelectItem>
                  <SelectItem value='other'>Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='reason'>Reason for Suspicion</Label>
              <Textarea
                id='reason'
                placeholder='Describe why you think this NFT might be fraudulent or suspicious'
                required
                className='min-h-[100px]'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='evidence'>Evidence (Optional)</Label>
              <Textarea
                id='evidence'
                placeholder='Provide any links, transaction hashes, or other evidence to support your claim'
                className='min-h-[100px]'
              />
            </div>
            <Button type='submit' className='w-full'>
              Submit Report
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
