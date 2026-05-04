import { Resend } from 'resend'
import { alertEmailHTML } from './templates/alertEmail'
import type { DetectedChange } from '@/types'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendAlertEmail({
  toEmail,
  extensionName,
  extensionId,
  change,
}: {
  toEmail: string
  extensionName: string
  extensionId: string
  change: DetectedChange
}): Promise<void> {
  const extensionUrl = `${process.env.NEXT_PUBLIC_APP_URL}/extension/${extensionId}`
  const unsubscribeUrl = `${process.env.NEXT_PUBLIC_APP_URL}/settings`

  const subject = change.type === 'rating_change'
    ? `${extensionName} rating changed`
    : change.type === 'version_update'
    ? `${extensionName} shipped a new version`
    : `${extensionName} hit a user milestone`

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Extly <alerts@extly.com>',
      to: toEmail,
      subject,
      html: alertEmailHTML({
        extensionName,
        message: change.message,
        alertType: change.type,
        extensionUrl,
        unsubscribeUrl,
      }),
    })

    if (error) {
      throw new Error(`Resend error: ${error.message}`)
    }
  } catch (err) {
    console.error('Failed to send email:', err)
    throw err
  }
}
