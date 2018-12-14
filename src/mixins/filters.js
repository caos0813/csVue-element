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
          txt = '待发布'
          if (type) {
            txt = 'warning'
          }
          break
      }
      return txt
    }
  },
  methods: {
    moduleId: function (type) {
      let modelId
      switch (type) {
        case 'college':
          modelId = 1
          break
        case 'major':
          modelId = 2
          break
        case 'profession':
          modelId = 3
          break
        case 'index':
          modelId = 4
          break
        case 'career-plan':
          modelId = 5
          break
        case 'volunteer-questions':
          modelId = 6
          break
      }
      return modelId
    }
  }
}
