import api from './api'
import formatDate from './formatDate'
function isEmpty (obj) {
  if (typeof obj === 'undefined' || obj === null || obj === '') {
    return true
  } else {
    return false
  }
}
export { api, formatDate, isEmpty }
