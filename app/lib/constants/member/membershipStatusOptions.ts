const membershipStatusOptions = [
  { value: 'PENDING', label: 'Pending Approval', description: 'New member awaiting approval' },
  { value: 'ACTIVE', label: 'Active Member', description: 'Full BNI member with all privileges' },
  { value: 'INACTIVE', label: 'Inactive', description: 'Temporarily inactive member' },
  { value: 'EXPIRED', label: 'Expired', description: 'Membership has expired' },
  { value: 'SUSPENDED', label: 'Suspended', description: 'Membership suspended' }
]

export default membershipStatusOptions
