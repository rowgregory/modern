const stowawayInvitationTemplate = (visitorName: string, eventDetails: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're Invited Aboard - Visitor Day at Coastal Referral Exchange</title>
</head>
<body style="margin: 0; padding: 40px 20px; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 16px; padding: 40px;">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <h1 style="margin: 0; color: #0f172a; font-size: 28px; font-weight: 700; letter-spacing: -0.025em;">Take the Gangway, ${visitorName}!</h1>
      <p style="margin: 12px 0 0 0; color: #475569; font-size: 16px; line-height: 1.5;">You've been invited to join us for Visitor Day at Coastal Referral Exchange.</p>
    </div>

    <!-- Event Details -->
    <div style="margin: 32px 0; padding: 24px; background: linear-gradient(135deg, #f0f9ff, #e0f2fe); border-radius: 12px; border-left: 4px solid #0ea5e9;">
      <h3 style="margin: 0 0 16px 0; color: #0f172a; font-size: 18px; font-weight: 600;">Event Details:</h3>
      <div style="background: white; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
        <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6; white-space: pre-line;">${eventDetails}</p>
      </div>
      <p style="margin: 0; color: #0369a1; font-size: 14px; line-height: 1.5;">
        Come discover how our maritime business network can help grow your connections and referrals.
      </p>
    </div>

    <!-- What to Expect */}
    <div style="margin: 32px 0; padding: 20px; background: linear-gradient(135deg, #f0fdf4, #dcfce7); border-radius: 12px; border-left: 4px solid #22c55e;">
      <h3 style="margin: 0 0 12px 0; color: #0f172a; font-size: 16px; font-weight: 600;">What awaits you:</h3>
      <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 14px; line-height: 1.6;">
        <li>Meet established business professionals in your area</li>
        <li>Learn about our referral exchange system</li>
        <li>Network with potential business partners</li>
        <li>Discover membership benefits and opportunities</li>
      </ul>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 32px; padding-top: 20px; border-top: 2px solid #f1f5f9;">
      <div style="margin-bottom: 16px;">
        <svg width="80" height="20" viewBox="0 0 100 25" style="opacity: 0.6;">
          <path d="M5 12.5C5 8.5 8.5 5 12.5 5S20 8.5 20 12.5 16.5 20 12.5 20 5 16.5 5 12.5z" fill="#3b82f6"/>
          <path d="M25 12.5c0-2 1-3.5 2.5-4.5s3.5-1 5.5 0 3.5 2.5 3.5 4.5-1 3.5-2.5 4.5-3.5 1-5.5 0-3.5-2.5-3.5-4.5z" fill="#2563eb"/>
          <path d="M45 12.5c0-4 3.5-7.5 7.5-7.5s7.5 3.5 7.5 7.5-3.5 7.5-7.5 7.5-7.5-3.5-7.5-7.5z" fill="#3b82f6"/>
          <text x="70" y="15" font-family="Arial" font-size="8" fill="#64748b">Coastal Referral Exchange</text>
        </svg>
      </div>
      <p style="margin: 0; color: #64748b; font-size: 12px; line-height: 1.4;">
        Thank you for your patience as we review your application.<br>
        Questions? Feel free to reach out to our crew at support@coastal-referral-exchange.com
      </p>
      <p style="margin: 16px 0 0 0; color: #94a3b8; font-size: 11px;">
        © 2025 Coastal Referral Exchange • Building Business Connections by the Shore
      </p>
    </div>
  </div>
</body>
</html>
`

export default stowawayInvitationTemplate
