const navigateMonth = (direction: 'prev' | 'next', setCurrentMonth: any) => {
  setCurrentMonth((prev: Date) => {
    const newMonth = new Date(prev)
    if (direction === 'prev') {
      newMonth.setMonth(prev.getMonth() - 1)
    } else {
      newMonth.setMonth(prev.getMonth() + 1)
    }
    return newMonth
  })
}

export default navigateMonth
