// TODO:import Cookies from 'js-cookie'
import Cookies from 'js-cookie'
export default {
  methods: {
    hasAuth () {
      // TODO:const role = this.$store.state.authority
      const role = Cookies.getJSON('user').authority
      for (let auth of arguments) {
        if (role.some(val => val === auth)) {
          return true
        }
      }
      return false
    }
  }
}
