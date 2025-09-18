const parleyCancelledTemplate = (
  participantName: string,
  otherParticipantName: string,
  originalMeetingDate: string,
  cancellationReason: string,
  isAdmin: boolean
) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Parley Cancelled - ${otherParticipantName}</title>
</head>
<body style="margin: 0; padding: 40px 20px; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 16px; padding: 40px;">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <h1 style="margin: 0; color: #0f172a; font-size: 28px; font-weight: 700; letter-spacing: -0.025em;">⚠️ Parley Cancelled</h1>
      <p style="margin: 12px 0 0 0; color: #475569; font-size: 16px; line-height: 1.5;">Your scheduled meeting with ${otherParticipantName} has been cancelled.</p>
    </div>

    <!-- Cancellation Details -->
    <div style="margin: 32px 0; padding: 24px; background: linear-gradient(135deg, #fef2f2, #fee2e2); border-radius: 12px; border-left: 4px solid #ef4444;">
      <h3 style="margin: 0 0 16px 0; color: #0f172a; font-size: 18px; font-weight: 600;">Cancellation Details</h3>
      
      <div style="margin-bottom: 12px;">
        <strong style="color: #334155; font-size: 14px;">Participants:</strong>
        <p style="margin: 4px 0 0 0; color: #475569; font-size: 16px; font-weight: 600;">${participantName} & ${otherParticipantName}</p>
      </div>
      
      <div style="margin-bottom: 12px;">
        <strong style="color: #334155; font-size: 14px;">Originally Scheduled:</strong>
        <p style="margin: 4px 0 0 0; color: #475569; font-size: 15px; line-height: 1.5;">${originalMeetingDate}</p>
      </div>
      
      <div style="margin-bottom: 12px;">
        <strong style="color: #334155; font-size: 14px;">Reason:</strong>
        <p style="margin: 4px 0 0 0; color: #475569; font-size: 15px; line-height: 1.5;">${cancellationReason}</p>
      </div>
      
      <div>
        <strong style="color: #334155; font-size: 14px;">Status:</strong>
        <p style="margin: 4px 0 0 0; color: #ef4444; font-size: 15px; font-weight: 600;">❌ Cancelled</p>
      </div>
    </div>

    <!-- Action Buttons -->
    <div style="text-align: center; margin: 36px 0;">
      <div style="margin-bottom: 12px;">
        <a href="${isAdmin ? '/admin/bridge' : '/member/bridge'}" style="display: inline-block; background: linear-gradient(135deg, #6366f1, #4f46e5); color: white; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: 600; font-size: 15px; margin-right: 8px; box-shadow: 0 4px 14px 0 rgba(99, 102, 241, 0.3);">
          Reschedule Meeting
        </a>
        <a href="${isAdmin ? '/admin/bridge' : '/member/bridge'}" style="display: inline-block; background: linear-gradient(135deg, #10b981, #059669); color: white; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: 600; font-size: 15px; margin-left: 8px; box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.3);">
          View Dashboard
        </a>
      </div>
    </div>

    <!-- Encouragement Section -->
    <div style="margin: 32px 0; padding: 20px; background: linear-gradient(135deg, #f0f9ff, #e0f2fe); border-radius: 12px; border-left: 4px solid #0ea5e9;">
      <h3 style="margin: 0 0 12px 0; color: #0c4a6e; font-size: 16px; font-weight: 600;">Don't Let This Stop Your Momentum:</h3>
      <ul style="margin: 0; padding-left: 20px; color: #0369a1; font-size: 14px; line-height: 1.6;">
        <li>Reach out to reschedule when timing improves</li>
        <li>Consider connecting with other chapter members</li>
        <li>Keep building your business network</li>
        <li>Schedule alternative networking opportunities</li>
      </ul>
    </div>

    <!-- Support Section -->
    <div style="margin: 24px 0; padding: 18px; background: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0;">
      <p style="margin: 0 0 8px 0; color: #334155; font-size: 14px; font-weight: 600;">⛵ Need Support?</p>
      <p style="margin: 0; color: #475569; font-size: 13px; line-height: 1.5;">
        If you need help rescheduling or have questions about this cancellation, contact your chapter administrator.
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
        This notification was sent through the Coastal Referral Exchange.<br>
        We're here to help you maintain strong business connections.
      </p>
      <p style="margin: 16px 0 0 0; color: #94a3b8; font-size: 11px;">
        © 2025 Coastal Referral Exchange • Building Business Connections by the Shore
      </p>
    </div>
  </div>
</body>
</html>
`
export default parleyCancelledTemplate
