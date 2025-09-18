const parleyRequestTemplate = (
  requesterName: string,
  meetingType: string,
  suggestedTime: string,
  fullUrl: string,
  duration: number,
  location: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Parley Request from ${requesterName}</title>
</head>
<body style="margin: 0; padding: 20px 10px; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 16px; padding: 20px;">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <h1 style="margin: 0; color: #0f172a; font-size: 28px; font-weight: 700; letter-spacing: -0.025em;">Ahoy! Parley Request</h1>
      <p style="margin: 12px 0 0 0; color: #475569; font-size: 16px; line-height: 1.5;">${requesterName} is requesting a meeting with ${location}.</p>
    </div>

    <!-- Meeting Details -->
    <div style="margin: 32px 0; padding: 20px; background: linear-gradient(135deg, #f0f9ff, #e0f2fe); border-radius: 12px; border-left: 4px solid #0ea5e9;">
      <h3 style="margin: 0 0 16px 0; color: #0f172a; font-size: 18px; font-weight: 600;">Meeting Details</h3>
      
      <div style="margin-bottom: 12px;">
        <strong style="color: #334155; font-size: 14px;">Requested by:</strong>
        <p style="margin: 4px 0 0 0; color: #475569; font-size: 16px; font-weight: 600;">${requesterName}</p>
      </div>

      <div style="margin-bottom: 12px;">
        <strong style="color: #334155; font-size: 14px;">Suggested Time:</strong>
        <p style="margin: 4px 0 0 0; color: #475569; font-size: 15px; line-height: 1.6;">${suggestedTime}</p>
      </div>

      <div style="margin-bottom: 12px;">
        <strong style="color: #334155; font-size: 14px;">Duration:</strong>
        <p style="margin: 4px 0 0 0; color: #475569; font-size: 15px; line-height: 1.6;">${duration} minutes</p>
      </div>
      
      <div style="margin-bottom: 12px;">
        <strong style="color: #334155; font-size: 14px;">Type:</strong>
        <p style="margin: 4px 0 0 0; color: #475569; font-size: 15px; line-height: 1.5;">${meetingType}</p>
      </div>
    </div>

    <!-- Action Buttons -->
    <div style="margin: 36px 0; text-align: center;">
      <div style="max-width: 280px; margin: 0 auto;">
        <a href="${fullUrl}" style="display: block; background: #0891b2; color: white; text-decoration: none; padding: 16px 32px; border-radius: 10px; font-weight: 600; font-size: 16px; text-align: center; box-shadow: 0 4px 14px 0 rgba(8, 145, 178, 0.3); width: 100%; box-sizing: border-box;">
          Review Request
        </a>
      </div>
    </div>

    <!-- Benefits Section -->
    <div style="margin: 32px 0; padding: 16px; background: linear-gradient(135deg, #fef3c7, #fde68a); border-radius: 12px; border-left: 4px solid #f59e0b;">
      <h3 style="margin: 0 0 12px 0; color: #92400e; font-size: 16px; font-weight: 600;">Benefits of Parleys:</h3>
      <ul style="margin: 0; padding-left: 20px; color: #a16207; font-size: 14px; line-height: 1.6;">
        <li>Strengthen professional relationships</li>
        <li>Discover collaboration opportunities</li>
        <li>Exchange valuable business insights</li>
        <li>Build trust within the CORE coastal community</li>
      </ul>
    </div>

    <!-- Alternative Response -->
    <div style="margin: 24px 0; padding: 16px; background: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0;">
      <p style="margin: 0 0 8px 0; color: #334155; font-size: 14px; font-weight: 600;">Unable to use the buttons above?</p>
      <p style="margin: 0; color: #475569; font-size: 13px; line-height: 1.5;">
       Log into the Coastal Referral Exchange to manage this parley request.
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 32px; padding-top: 20px; border-top: 2px solid #f1f5f9;">
      <p style="margin: 0; color: #64748b; font-size: 12px; line-height: 1.4;">
        This parley request was sent through the Coastal Referral Exchange.<br>
        All meetings are voluntary and should benefit both parties.
      </p>
      <p style="margin: 16px 0 0 0; color: #94a3b8; font-size: 11px;">
        © 2025 Coastal Referral Exchange • Building Business Connections by the Shore
      </p>
    </div>
  </div>
</body>
</html>
`

export default parleyRequestTemplate
