import { MessageBox } from 'element-ui'
export const confirm = function (content, title) {
  return MessageBox.confirm(content, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
}
