import { App } from 'vue'
import { formatUtcString } from '@/utils/time-format'
export default function registerProperty(app: App) {
  app.config.globalProperties.$filters = {
    // 给时间做格式化是常见的功能可以封装起来作为一个工具
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
}
