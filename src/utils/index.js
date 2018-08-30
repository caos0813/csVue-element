import api from './api'
import formatDate from './formatDate'
import { confirm } from './handle'
function isEmpty (obj) {
  if (typeof obj === 'undefined' || obj === null || obj === '') {
    return true
  } else {
    return false
  }
}
console.log(confirm)
export { api, formatDate, isEmpty, confirm }
