const swabbiePendingTemplate = (swabbieName: string, chapterName: string, fullPortUrl: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to the Muster - ${chapterName}</title>
</head>
<body style="margin: 0; padding: 40px 20px; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 16px; padding: 40px;">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <h1 style="margin: 0; color: #0f172a; font-size: 28px; font-weight: 700; letter-spacing: -0.025em;">Welcome to Port!</h1>
    </div>

    <!-- Welcome Message -->
    <div style="margin: 32px 0; padding: 20px; background: linear-gradient(135deg, #f0fdf4, #dcfce7); border-radius: 12px; border-left: 4px solid #16a34a;">
      <h3 style="margin: 0 0 12px 0; color: #15803d; font-size: 16px; font-weight: 600;">Welcome to Port!</h3>
      <p style="margin: 0; color: #166534; font-size: 14px; line-height: 1.6;">
        Your application has safely landed at port and is currently PENDING, in the process of the initial review. While the Quartermaster examines your submission, feel free to explore the Port to access resources, guides, and learn how we help local entrepreneurs thrive through meaningful connections and quality referrals. Once the initial review is complete, your application will move on to the background check before you are officially added to the muster and ready to set sail!
      </p>
    </div>

    <!-- Call to Action -->
    <div style="text-align: center; margin: 36px 0;">
      <div style="margin-bottom: 16px;">
        <a href="${fullPortUrl}" style="display: inline-block; background: linear-gradient(135deg, #0ea5e9, #0284c7); color: white; text-decoration: none; padding: 16px 32px; border-radius: 10px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 14px 0 rgba(14, 165, 233, 0.3);">
          Visit the Port
        </a>
      </div>
      <p style="margin: 0; color: #64748b; font-size: 13px;">Get your bearings and learn about our crew</p>
    </div>

    <!-- Muster Details -->
    <div style="margin: 32px 0; padding: 24px; background: linear-gradient(135deg, #f0f9ff, #e0f2fe); border-radius: 12px; border-left: 4px solid #0ea5e9;">
      <h3 style="margin: 0 0 16px 0; color: #0f172a; font-size: 18px; font-weight: 600;">Muster Details</h3>
      
      <div style="margin-bottom: 12px;">
        <strong style="color: #334155; font-size: 14px;">Name:</strong>
        <p style="margin: 4px 0 0 0; color: #475569; font-size: 16px; font-weight: 600;">${swabbieName}</p>
      </div>

      <div style="margin-bottom: 12px;">
        <strong style="color: #334155; font-size: 14px;">Chapter:</strong>
        <p style="margin: 4px 0 0 0; color: #475569; font-size: 16px; font-weight: 600;">${chapterName}</p>
      </div>
      
      <div>
        <strong style="color: #334155; font-size: 14px;">Status:</strong>
        <p style="margin: 4px 0 0 0; color: #0ea5e9; font-size: 15px; font-weight: 600;">Swabbie (Visitor)</p>
      </div>
    </div>



    <!-- What's Next Section -->
    <div style="margin: 32px 0; padding: 20px; background: linear-gradient(135deg, #fef3c7, #fde68a); border-radius: 12px; border-left: 4px solid #f59e0b;">
      <h3 style="margin: 0 0 12px 0; color: #92400e; font-size: 16px; font-weight: 600;">What Awaits at the Port:</h3>
      <ul style="margin: 0; padding-left: 20px; color: #a16207; font-size: 14px; line-height: 1.6;">
        <li>Learn about our chapter and networking opportunities</li>
        <li>Discover the benefits of joining our crew</li>
        <li>Connect with fellow business professionals</li>
      </ul>
    </div>

    <!-- Alternative Link -->
    <div style="margin: 24px 0; padding: 18px; background: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0;">
      <p style="margin: 0 0 8px 0; color: #334155; font-size: 14px; font-weight: 600;">⚓ Can't click the button? Navigate directly:</p>
      <p style="margin: 0; word-break: break-all; font-family: 'SF Mono', Monaco, monospace; font-size: 12px; color: #0ea5e9; background: white; padding: 8px; border-radius: 6px; border: 1px solid #e2e8f0;">
        ${fullPortUrl}
      </p>
    </div>



    <!-- Footer -->
    <div style="text-align: center; margin-top: 32px; padding-top: 20px; border-top: 2px solid #f1f5f9;">
      <div style="margin-bottom: 16px;">
        <svg width="80" height="20" viewBox="0 0 100 25" style="opacity: 0.6;">
          <path d="M5 12.5C5 8.5 8.5 5 12.5 5S20 8.5 20 12.5 16.5 20 12.5 20 5 16.5 5 12.5z" fill="#0ea5e9"/>
          <path d="M25 12.5c0-2 1-3.5 2.5-4.5s3.5-1 5.5 0 3.5 2.5 3.5 4.5-1 3.5-2.5 4.5-3.5 1-5.5 0-3.5-2.5-3.5-4.5z" fill="#0284c7"/>
          <path d="M45 12.5c0-4 3.5-7.5 7.5-7.5s7.5 3.5 7.5 7.5-3.5 7.5-7.5 7.5-7.5-3.5-7.5-7.5z" fill="#0ea5e9"/>
          <text x="70" y="15" font-family="Arial" font-size="8" fill="#64748b">CRE</text>
        </svg>
      </div>
      <p style="margin: 0; color: #64748b; font-size: 12px; line-height: 1.4;">
        You've been added to the ${chapterName} muster as a swabbie.<br>
        Visit the Port to explore membership opportunities and upcoming events.
      </p>
      <p style="margin: 16px 0 0 0; color: #94a3b8; font-size: 11px;">
        © 2025 Coastal Referral Exchange • Building Business Connections by the Shore
      </p>
    </div>
  </div>
</body>
</html>
`

export default swabbiePendingTemplate
