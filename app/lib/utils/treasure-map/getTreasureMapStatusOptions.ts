import { ITreasureMap } from '@/types/treasure-map'

const getTreasureMapStatusOptions = (treasureMaps: ITreasureMap[]) => [
  { value: 'all', label: 'All Status', count: treasureMaps?.length },
  { value: 'GIVEN', label: 'Given', count: treasureMaps?.filter((t) => t.status === 'GIVEN').length },
  { value: 'ACCEPTED', label: 'Accepted', count: treasureMaps?.filter((t) => t.status === 'ACCEPTED').length },
  { value: 'CONTACTED', label: 'Contacted', count: treasureMaps?.filter((t) => t.status === 'CONTACTED').length },
  { value: 'CLOSED', label: 'Closed', count: treasureMaps?.filter((t) => t.status === 'CLOSED').length },
  { value: 'DECLINED', label: 'Declined', count: treasureMaps?.filter((t) => t.status === 'DECLINED').length }
]

export default getTreasureMapStatusOptions
