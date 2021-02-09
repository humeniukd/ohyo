import { subMonths, isSameYear, startOfMonth, endOfMonth } from 'date-fns'

export const getNameOfPastMonth = (
  numberOfMonthsFromNow = 1,
  showYear: boolean,
  formatDate: any,
  locale: string,
) => {
  const date = subMonths(Date.now(), numberOfMonthsFromNow)
  const shouldShowYear = showYear && !isSameYear(date, new Date())

  return formatDate(date, shouldShowYear, true, locale)
}

export const getYearOfPastMonth = (n = 1, formatDate: any, locale: string) => {
  const date = subMonths(Date.now(), n)
  return !isSameYear(date, new Date()) ? formatDate(date, true, false, locale) : ''
}

export const getStartAndEndOfPastMonthMonth = (numberOfMonthsFromNow: number) => {
  const d = subMonths(new Date(), numberOfMonthsFromNow)
  return {
    from: Number(startOfMonth(d)),
    to: Number(endOfMonth(d)),
  }
}
