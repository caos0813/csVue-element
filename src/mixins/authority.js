export default {
  methods: {
    hasAuth () {
      const role = this.$store.state.authority
      for (let auth of arguments) {
        if (role.some(val => val === auth)) {
          return true
        }
      }
      return false
    }
  }
}
