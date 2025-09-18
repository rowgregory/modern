const swabbieBackgroundCheckTemplate = (applicantName: string, fullPortUrl: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Coastal Referral Exchange Application - Background Check Phase</title>
</head>
<body style="margin: 0; padding: 40px 20px; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 16px; padding: 40px;">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <h1 style="margin: 0; color: #0f172a; font-size: 28px; font-weight: 700; letter-spacing: -0.025em;">Great Progress, ${applicantName}!</h1>
      <p style="margin: 12px 0 0 0; color: #475569; font-size: 16px; line-height: 1.5;">Your application has passed the background check phase and is now onto the final decision.</p>
    </div>

    <div style="text-align: center; margin: 36px 0;">
      <div style="margin-bottom: 16px;">
        <a href="${fullPortUrl}" style="display: inline-block; background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; text-decoration: none; padding: 16px 32px; border-radius: 10px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 14px 0 rgba(14, 165, 233, 0.3);">
          Visit the Port
        </a>
      </div>
      <p style="margin: 0; color: #64748b; font-size: 13px;">Get your bearings and learn about our crew</p>
    </div>

    <!-- Voyage Progress Section -->
    <div style="margin: 32px 0; padding: 24px; background: linear-gradient(135deg, #fff7ed, #fed7aa); border-radius: 12px; border-left: 4px solid #f97316;">
      <h3 style="margin: 0 0 16px 0; color: #0f172a; font-size: 16px; font-weight: 600;">Your Voyage Progress:</h3>
      
      <div style="margin-bottom: 12px;">
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <div style="width: 16px; height: 16px; background: #10b981; border-radius: 50%; margin-right: 12px; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 10px; font-weight: bold;">✓</span>
          </div>
          <span style="color: #374151; font-size: 14px; font-weight: 500;">Application Submitted</span>
        </div>
        
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <div style="width: 16px; height: 16px; background: #10b981; border-radius: 50%; margin-right: 12px; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 10px; font-weight: bold;">✓</span>
          </div>
          <span style="color: #374151; font-size: 14px; font-weight: 500;">Initial Review</span>
        </div>
        
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <div style="width: 16px; height: 16px; background: #10b981; border-radius: 50%; margin-right: 12px; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 10px; font-weight: bold;">✓</span>
          </div>
          <span style="color: #374151; font-size: 14px; font-weight: 500;">Background Check</span>
        </div>
        
        <div style="display: flex; align-items: center; margin-bottom: 8px;">
          <div style="width: 16px; height: 16px; background: #3b82f6; border-radius: 50%; margin-right: 12px; display: flex; align-items: center; justify-content: center; animation: pulse 2s infinite;">
            <span style="color: white; font-size: 10px; font-weight: bold;">⚡</span>
          </div>
          <span style="color: #3b82f6; font-size: 14px; font-weight: 600;">Final Decision (Current Step)</span>
        </div>
      </div>
    </div>

    <!-- What's Happening Section -->
    <div style="margin: 32px 0; padding: 20px; background: #f0f9ff; border-radius: 12px; border-left: 4px solid #0ea5e9;">
      <h3 style="margin: 0 0 12px 0; color: #0f172a; font-size: 16px; font-weight: 600;">What's happening now:</h3>
      <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 14px; line-height: 1.6;">
        <li>Reviewing your full application and background results together</li>
        <li>Making the final membership decision</li>
        <li>Preparing your onboarding details and next steps</li>
        <li>Notifying you of the outcome via email</li>
      </ul>
    </div>

    <!-- Next Steps -->
    <div style="margin: 24px 0; padding: 18px; background: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0;">
      <p style="margin: 0 0 8px 0; color: #334155; font-size: 14px; font-weight: 600;">⚓ What happens next:</p>
      <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.6;">
        Once the final decision is made, your application status will change to ACTIVE, officially granting you membership and access to the Bridge.
      </p>
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

export default swabbieBackgroundCheckTemplate
