import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

export class Utils {
  private static readonly Timezone = 'America/Sao_Paulo'

  static getCurrentDateTime(): string {
    const date = dayjs().toISOString();
    return date;
  }
}