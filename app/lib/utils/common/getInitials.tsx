const getInitials = (name: any) => {
  return name
    .split(' ')
    .map((n: any[]) => n[0])
    .join('')
    .toUpperCase()
}

export default getInitials
