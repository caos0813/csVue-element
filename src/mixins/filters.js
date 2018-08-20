import { formatDate } from '@/utils'
export default {
  filters: {
    dateTime: function (timestr, fmt) {
      return formatDate(new Date(timestr), fmt)
    }
  },
  methods: {
    test: function () {
      console.log('test')
    }
  }
}
