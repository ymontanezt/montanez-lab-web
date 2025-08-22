import { type NextRequest, NextResponse } from 'next/server'
import { sendContactNotification, sendContactConfirmation } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, contactData } = body

    if (!type || !contactData) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    let result = false

    switch (type) {
      case 'notification':
        result = await sendContactNotification(contactData)
        break
      case 'confirmation':
        result = await sendContactConfirmation(contactData)
        break
      default:
        return NextResponse.json({ error: 'Invalid email type' }, { status: 400 })
    }

    if (result) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }
  } catch (error) {
    console.error('[v0] Email API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
