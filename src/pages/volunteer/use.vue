<template>
  <div class="page">
    <div class="tools-bar">
      <!-- :checkData="checkData" @refresh="refresh" -->
      <listHandle :showSoldout="false"></listHandle>
    </div>
    {{type}} volunter-user
  </div>
</template>
<script>
import { listHandle } from '@/components'
export default {
  data () {
    return {
      type: ''
    }
  },
  components: {
    listHandle
  },
  watch: {
    '$route' (to, from) {
      console.log(to.params.type)
      this.type = to.params.type
    }
  },
  created () {
    this.type = this.$route.params.type
  }
}
</script>
