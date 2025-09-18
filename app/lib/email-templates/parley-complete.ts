const parleyCompletedTemplate = (
  participantName: string,
  otherParticipantName: string,
  updatedAt: string,
  fullUrl: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Parley Completed - ${otherParticipantName}</title>
</head>
<body style="margin: 0; padding: 40px 20px; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 16px; padding: 40px;">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <h1 style="margin: 0; color: #0f172a; font-size: 28px; font-weight: 700; letter-spacing: -0.025em;">⚓ Parley Completed!</h1>
      <p style="margin: 12px 0 0 0; color: #475569; font-size: 16px; line-height: 1.5;">Your meeting with ${otherParticipantName} has been successfully logged.</p>
    </div>

    <!-- Meeting Summary -->
    <div style="margin: 32px 0; padding: 24px; background: linear-gradient(135deg, #f0fdf4, #dcfce7); border-radius: 12px; border-left: 4px solid #16a34a;">
      <h3 style="margin: 0 0 16px 0; color: #0f172a; font-size: 18px; font-weight: 600;">Meeting Summary</h3>
      
      <div style="margin-bottom: 12px;">
        <strong style="color: #334155; font-size: 14px;">Participants:</strong>
        <p style="margin: 4px 0 0 0; color: #475569; font-size: 16px; font-weight: 600;">${participantName} & ${otherParticipantName}</p>
      </div>
      
      <div style="margin-bottom: 12px;">
        <strong style="color: #334155; font-size: 14px;">Date Completed:</strong>
        <p style="margin: 4px 0 0 0; color: #475569; font-size: 15px; line-height: 1.5;">${updatedAt}</p>
      </div>
      
      <div>
        <strong style="color: #334155; font-size: 14px;">Status:</strong>
        <p style="margin: 4px 0 0 0; color: #16a34a; font-size: 15px; font-weight: 600;">Successfully Completed</p>
      </div>
    </div>

    <!-- Action Buttons -->
    <div style="margin: 36px 0; text-align: center;">
      <div style="max-width: 280px; margin: 0 auto;">
        <a href="${fullUrl}" style="display: block; background: #0891b2; color: white; text-decoration: none; padding: 16px 32px; border-radius: 10px; font-weight: 600; font-size: 16px; text-align: center; box-shadow: 0 4px 14px 0 rgba(8, 145, 178, 0.3); width: 100%; box-sizing: border-box;">
          Review Parley
        </a>
      </div>
    </div>

    <!-- Success Benefits -->
    <div style="margin: 32px 0; padding: 20px; background: linear-gradient(135deg, #fef3c7, #fde68a); border-radius: 12px; border-left: 4px solid #f59e0b;">
      <h3 style="margin: 0 0 12px 0; color: #92400e; font-size: 16px; font-weight: 600;">Great Work! You've:</h3>
      <ul style="margin: 0; padding-left: 20px; color: #a16207; font-size: 14px; line-height: 1.6;">
        <li>Strengthened your professional network</li>
        <li>Contributed to your networking score</li>
        <li>Built valuable business relationships</li>
        <li>Advanced your chapter engagement</li>
      </ul>
    </div>

    <!-- Next Steps -->
    <div style="margin: 24px 0; padding: 18px; background: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0;">
      <p style="margin: 0 0 8px 0; color: #334155; font-size: 14px; font-weight: 600;">🚀 Keep Building Connections</p>
      <p style="margin: 0; color: #475569; font-size: 13px; line-height: 1.5;">
        Consider scheduling follow-up meetings or exploring referral opportunities with ${otherParticipantName}.
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
        This confirmation was sent through the Coastal Referral Exchange.<br>
        Your networking activity has been recorded and contributes to your overall score.
      </p>
      <p style="margin: 16px 0 0 0; color: #94a3b8; font-size: 11px;">
        © 2025 Coastal Referral Exchange • Building Business Connections by the Shore
      </p>
    </div>
  </div>
</body>
</html>
`

export default parleyCompletedTemplate
