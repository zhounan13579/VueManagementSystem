import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const DATA_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export function formatUtcString(
  utcstring: string,
  formatstring: string = DATA_TIME_FORMAT
) {
  // 默认对UTC进行格式化的时候，用的是零时区的。如果想用东八区的还需要再修改一下。
  return dayjs.utc(utcstring).format(formatstring)
  // return dayjs(utcstring)
}
