import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export class DateUtils {
  private static readonly Timezone = 'America/Sao_Paulo'
  private static readonly dateFormat = 'YYYY-MM-DD HH:mm:ss'

  static getCurrentDateTime():string {
    const date = dayjs().tz(this.Timezone);
    const formattedDate = date.format(this.dateFormat);  
    return formattedDate;
  }
}
