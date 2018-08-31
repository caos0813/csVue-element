import { formatDate } from '@/utils'
export default {
  filters: {
    dateTime: function (timestr, fmt) {
      if (timestr) {
        return formatDate(new Date(timestr), fmt)
      }
    },
    publicStatus: function (status, type) {
      let txt
      switch (status) {
        case 1:
          txt = '已发布'
          if (type) {
            txt = 'success'
          }
          break
        case 2:
          txt = '草稿'
          if (type) {
            txt = 'info'
          }
          break
        case 3:
          txt = '已下架'
          if (type) {
            txt = 'warning'
          }
          break
        case 4:
          txt = '未发布'
          if (type) {
            txt = 'warning'
          }
          break
      }
      return txt
    }
  }
}
