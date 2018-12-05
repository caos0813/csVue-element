export default {
  methods: {
    toState (obj) {
      this.$router.push(obj)
    },
    goBack (num) {
      this.$router.go(num || -1)
    }
  }
}
