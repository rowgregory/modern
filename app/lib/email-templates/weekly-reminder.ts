const weeklyReminderTemplate = (memberName: string, weekEndDate: string, isAdmin: boolean) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>⚓ Weekly Activity Reminder - Coastal Referral Exchange</title>
</head>
<body style="margin: 0; padding: 40px 20px; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 16px; padding: 40px;">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <div style="margin-bottom: 16px;">
        <svg width="64" height="64" viewBox="0 0 64 64" style="margin: 0 auto;">
          <defs>
            <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="30" fill="url(#oceanGradient)" opacity="0.3" stroke="#3b82f6" strokeWidth="2"/>
          <path d="M32 16 L32 48 M20 28 L44 28 M22 42 Q20 44 22 44 M42 42 Q44 44 42 44" stroke="#0ea5e9" strokeWidth="3" fill="none"/>
        </svg>
      </div>
      <h1 style="margin: 0; color: #0f172a; font-size: 28px; font-weight: 700; letter-spacing: -0.025em;">Ahoy, ${memberName}!</h1>
      <p style="margin: 12px 0 0 0; color: #475569; font-size: 16px; line-height: 1.5;">Time to log your weekly adventures before the tide changes.</p>
    </div>

    <!-- Deadline Alert -->
    <div style="margin: 24px 0; padding: 20px; background: linear-gradient(135deg, #fef3c7, #fde68a); border-radius: 12px; border-left: 4px solid #f59e0b; text-align: center;">
      <h3 style="margin: 0 0 8px 0; color: #92400e; font-size: 18px; font-weight: 600;">⏰ Deadline Approaching</h3>
      <p style="margin: 0; color: #a16207; font-size: 16px; font-weight: 600;">
        Submit by midnight on ${weekEndDate}
      </p>
    </div>

    <!-- Activities to Log -->
    <div style="margin: 32px 0; padding: 24px; background: linear-gradient(135deg, #f0f9ff, #e0f2fe); border-radius: 12px; border-left: 4px solid #0ea5e9;">
      <h3 style="margin: 0 0 16px 0; color: #0f172a; font-size: 18px; font-weight: 600;">Log Your Weekly Activities:</h3>
      
      <div style="space-y: 12px;">
        <div style="display: flex; align-items: center; margin-bottom: 12px;">
          <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; margin-right: 12px;"></div>
          <div>
            <strong style="color: #0f172a; font-size: 15px;">🗺️ Treasure Maps</strong>
            <p style="margin: 2px 0 0 0; color: #475569; font-size: 13px;">Referrals you've given to fellow crew members</p>
          </div>
        </div>
        
        <div style="display: flex; align-items: center; margin-bottom: 12px;">
          <div style="width: 8px; height: 8px; background: #f59e0b; border-radius: 50%; margin-right: 12px;"></div>
          <div>
            <strong style="color: #0f172a; font-size: 15px;">⚓ Anchors</strong>
            <p style="margin: 2px 0 0 0; color: #475569; font-size: 13px;">Referrals you've received from other members</p>
          </div>
        </div>
        
        <div style="display: flex; align-items: center; margin-bottom: 12px;">
          <div style="width: 8px; height: 8px; background: #6366f1; border-radius: 50%; margin-right: 12px;"></div>
          <div>
            <strong style="color: #0f172a; font-size: 15px;">🤝 Parleys</strong>
            <p style="margin: 2px 0 0 0; color: #475569; font-size: 13px;">One-on-one meetings with other business owners</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Button -->
    <div style="text-align: center; margin: 36px 0;">
      <a href="${isAdmin ? '/admin/bridge' : '/member/bridge'}" style="display: inline-block; background: linear-gradient(135deg, #10b981, #059669); color: white; text-decoration: none; padding: 16px 32px; border-radius: 10px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.3); margin-bottom: 12px;">
        🚀 Log Activities Now
      </a>
      <p style="margin: 0; color: #64748b; font-size: 13px;">Takes less than 5 minutes</p>
    </div>

    <!-- Why This Matters -->
    <div style="margin: 32px 0; padding: 20px; background: linear-gradient(135deg, #f3e8ff, #e9d5ff); border-radius: 12px; border-left: 4px solid #a855f7;">
      <h3 style="margin: 0 0 12px 0; color: #6b21a8; font-size: 16px; font-weight: 600;">Why Weekly Reporting Matters:</h3>
      <ul style="margin: 0; padding-left: 20px; color: #7c3aed; font-size: 14px; line-height: 1.6;">
        <li>Track your networking progress and celebrate wins</li>
        <li>Ensure proper recognition for your referral efforts</li>
        <li>Help us maintain accurate chapter statistics</li>
        <li>Stay accountable to your business growth goals</li>
      </ul>
    </div>

    <!-- Need Help Section -->
    <div style="margin: 24px 0; padding: 18px; background: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0;">
      <p style="margin: 0 0 8px 0; color: #334155; font-size: 14px; font-weight: 600;">⛵ Need Help?</p>
      <p style="margin: 0; color: #475569; font-size: 13px; line-height: 1.5;">
        Contact your chapter administrator or reply to this email if you need assistance logging your activities.
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
        This reminder is sent every Wednesday to help you stay on track.<br>
        Your weekly reporting period ends Wednesday at 11:59 PM.
      </p>
      <p style="margin: 16px 0 0 0; color: #94a3b8; font-size: 11px;">
        © 2025 Coastal Referral Exchange • Building Business Connections by the Shore
      </p>
    </div>
  </div>
</body>
</html>
`

export default weeklyReminderTemplate
