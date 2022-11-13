import moment from 'moment'

export const now = (): string => {
  return moment().utc().toISOString()
}
