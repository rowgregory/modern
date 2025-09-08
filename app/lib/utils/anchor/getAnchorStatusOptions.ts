import { IAnchor } from '@/types/anchor'

const getAnchorStatusOptions = (anchors: IAnchor[]) => [
  { value: 'all', label: 'All Status', count: anchors?.length },
  { value: 'REPORTED', label: 'Reported', count: anchors?.filter((f) => f.status === 'REPORTED').length },
  { value: 'VERIFIED', label: 'Verified', count: anchors?.filter((f) => f.status === 'VERIFIED').length },
  { value: 'DISPUTED', label: 'Disputed', count: anchors?.filter((f) => f.status === 'DISPUTED').length }
]

export default getAnchorStatusOptions
