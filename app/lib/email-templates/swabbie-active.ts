const swabbieActiveTemplate = (applicantName: string, fullBridgePath: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome Aboard - Coastal Referral Exchange</title>
</head>
<body style="margin: 0; padding: 40px 20px; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 16px; padding: 40px;">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <h1 style="margin: 0; color: #0f172a; font-size: 28px; font-weight: 700; letter-spacing: -0.025em;">Welcome Aboard, ${applicantName}!</h1>
      <p style="margin: 12px 0 0 0; color: #475569; font-size: 16px; line-height: 1.5;">Congratulations! Your voyage to join the Coastal Referral Exchange crew is complete. You're now an official member!</p>
    </div>

    <!-- Success Status -->
    <div style="text-align: center; margin: 36px 0;">
      <div style="display: inline-block; background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 16px 32px; border-radius: 10px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.3);">
        Full Crew Access Granted
      </div>
    </div>

    <!-- Voyage Progress Section -->
    <div style="margin: 32px 0; padding: 24px; background: linear-gradient(135deg, #ecfdf5, #d1fae5); border-radius: 12px; border-left: 4px solid #10b981;">
      <h3 style="margin: 0 0 16px 0; color: #0f172a; font-size: 16px; font-weight: 600;">Your Complete Voyage:</h3>
      
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
        
        <div style="display: flex; align-items: center; margin-bottom: 12px;">
          <div style="width: 16px; height: 16px; background: #10b981; border-radius: 50%; margin-right: 12px; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 10px; font-weight: bold;">✓</span>
          </div>
          <span style="color: #374151; font-size: 14px; font-weight: 500;">Final Decision</span>
        </div>

        <div style="display: flex; align-items: center;">
          <div style="width: 16px; height: 16px; background: #10b981; border-radius: 50%; margin-right: 12px; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 10px; font-weight: bold;">🏴‍☠️</span>
          </div>
          <span style="color: #10b981; font-size: 14px; font-weight: 600;">Welcome Aboard - Crew Member!</span>
        </div>
      </div>
    </div>

    <!-- Access Button -->
    <div style="text-align: center; margin: 36px 0;">
      <a href="${fullBridgePath}" style="display: inline-block; background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; text-decoration: none; padding: 16px 32px; border-radius: 10px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 14px 0 rgba(14, 165, 233, 0.3); transition: all 0.2s; border: none;">
       Access The Bridge
      </a>
    </div>

    <!-- Login Instructions -->
    <div style="margin: 32px 0; padding: 20px; background: #f0f9ff; border-radius: 12px; border-left: 4px solid #0ea5e9;">
      <h3 style="margin: 0 0 12px 0; color: #0f172a; font-size: 16px; font-weight: 600;">How to Access The Bridge</h3>
      <div style="margin-bottom: 12px;">
        <div style="display: flex; align-items: flex-start; margin-bottom: 8px;">
          <div style="width: 20px; height: 20px; background: #0ea5e9; color: white; border-radius: 50%; margin-right: 12px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0; margin-top: 2px;">1</div>
          <span style="color: #475569; font-size: 14px; line-height: 1.6;">Click the "Access The Bridge" button above</span>
        </div>
        <div style="display: flex; align-items: flex-start; margin-bottom: 8px;">
          <div style="width: 20px; height: 20px; background: #0ea5e9; color: white; border-radius: 50%; margin-right: 12px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0; margin-top: 2px;">2</div>
          <span style="color: #475569; font-size: 14px; line-height: 1.6;">Enter your email address on the login screen</span>
        </div>
        <div style="display: flex; align-items: flex-start;">
          <div style="width: 20px; height: 20px; background: #0ea5e9; color: white; border-radius: 50%; margin-right: 12px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; flex-shrink: 0; margin-top: 2px;">3</div>
          <span style="color: #475569; font-size: 14px; line-height: 1.6;">Check your email for a secure magic link to access the platform</span>
        </div>
      </div>
    </div>

    <!-- What's Available Section -->
    <div style="margin: 32px 0; padding: 20px; background: #fefce8; border-radius: 12px; border-left: 4px solid #eab308;">
      <h3 style="margin: 0 0 12px 0; color: #0f172a; font-size: 16px; font-weight: 600;">What's Available to You Now:</h3>
      <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 14px; line-height: 1.6;">
        <li>Full access to the Coastal Referral Exchange network</li>
        <li>Connect and collaborate with fellow crew members</li>
        <li>Give and receive quality business treasure maps</li>
        <li>Access exclusive networking events and opportunities</li>
        <li>Grow your coastal business connections</li>
      </ul>
    </div>

    <!-- Alternative Link -->
    <div style="margin: 24px 0; padding: 18px; background: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0;">
      <p style="margin: 0 0 8px 0; color: #334155; font-size: 14px; font-weight: 600;">Can't click the button? Copy this link:</p>
      <p style="margin: 0; word-break: break-all; font-family: 'SF Mono', Monaco, monospace; font-size: 12px; color: #0ea5e9; background: white; padding: 8px; border-radius: 6px; border: 1px solid #e2e8f0;">
        ${fullBridgePath}
      </p>
    </div>

    <!-- Welcome Message -->
    <div style="margin: 32px 0; padding: 20px; background: linear-gradient(135deg, #ecfdf5, #d1fae5); border-radius: 12px; border-left: 4px solid #10b981;">
      <h3 style="margin: 0 0 12px 0; color: #0f172a; font-size: 16px; font-weight: 600;">🏴‍☠️ A Message from the Crew:</h3>
      <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.6; font-style: italic;">
        "Welcome to our tight-knit community of coastal business professionals! We're excited to have you aboard and look forward to the valuable connections and treasure maps you'll bring to our network. Fair winds and following seas on your business journey with us!"
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

export default swabbieActiveTemplate
