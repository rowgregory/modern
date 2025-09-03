import { IParley } from '@/types/parley'

const getParleyStatusOptions = (parleys: IParley[]) => [
  { value: 'all', label: 'All Status', count: parleys?.length },
  { value: 'REQUESTED', label: 'Requested', count: parleys?.filter((f) => f.status === 'REQUESTED').length },
  { value: 'CONFIRMED', label: 'Confirmed', count: parleys?.filter((f) => f.status === 'CONFIRMED').length },
  { value: 'COMPLETED', label: 'Completed', count: parleys?.filter((f) => f.status === 'COMPLETED').length },
  { value: 'CANCELLED', label: 'Cancelled', count: parleys?.filter((f) => f.status === 'CANCELLED').length }
]

export default getParleyStatusOptions
