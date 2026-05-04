export function alertEmailHTML({
  extensionName,
  message,
  alertType,
  extensionUrl,
  unsubscribeUrl,
}: {
  extensionName: string
  message: string
  alertType: 'rating_change' | 'version_update' | 'user_milestone'
  extensionUrl: string
  unsubscribeUrl: string
}): string {
  const icons = {
    rating_change: '📉',
    version_update: '🔄',
    user_milestone: '🎉',
  }

  const icon = icons[alertType]

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Extly Alert: ${extensionName}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAFAFA; color: #0F1117;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAFAFA; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" maxWidth="600px" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFFFF; border: 1px solid #E8ECF0; border-radius: 12px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background-color: #2563EB; padding: 32px; text-align: center;">
              <h1 style="color: #FFFFFF; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.025em;">Extly</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 32px;">
              <div style="font-size: 48px; margin-bottom: 24px; text-align: center;">${icon}</div>
              <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600; text-align: center;">
                Alert for ${extensionName}
              </h2>
              <p style="margin: 0 0 32px 0; font-size: 16px; line-height: 24px; color: #4B5563; text-align: center;">
                ${message}
              </p>
              
              <div style="text-align: center;">
                <a href="${extensionUrl}" style="display: inline-block; background-color: #2563EB; color: #FFFFFF; padding: 14px 28px; border-radius: 8px; font-size: 16px; font-weight: 600; text-decoration: none;">
                  View Extension Details &rarr;
                </a>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 32px; background-color: #F9FAFB; border-top: 1px solid #E8ECF0; text-align: center;">
              <p style="margin: 0 0 12px 0; font-size: 14px; color: #6B7280;">
                You're receiving this because you're tracking <strong>${extensionName}</strong> on Extly.
              </p>
              <p style="margin: 0; font-size: 14px;">
                <a href="${unsubscribeUrl}" style="color: #2563EB; text-decoration: underline;">Manage notification settings</a>
              </p>
            </td>
          </tr>
        </table>
        
        <table width="100%" maxWidth="600px" cellpadding="0" cellspacing="0" style="max-width: 600px; margin-top: 24px;">
          <tr>
            <td style="text-align: center; font-size: 12px; color: #9CA3AF;">
              &copy; ${new Date().getFullYear()} Extly. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}
