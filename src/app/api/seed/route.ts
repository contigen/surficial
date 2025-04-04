// app/api/seed/route.ts
import { seedVectorDatabase } from '&/lib/semantic-search'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('running code')
    const result = await seedVectorDatabase()
    // Log what we're sending back
    console.log('Sending response:', { success: true, data: result })
    return Response.json({ success: true, data: result })
  } catch (error) {
    console.error('Server error:', error)
    return Response.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    )
  }
}
