import dayjs from 'dayjs'
export function formatDate(date: Date) {
  const formatDate = dayjs(date).format('DD/MM/YYYY')

  return formatDate
}
