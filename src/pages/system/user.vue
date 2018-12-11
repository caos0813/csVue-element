<template>
  <div class="page">
    <div class="tools-bar">
      <!-- :checkData="checkData" @refresh="refresh" -->
      <listHandle :showSoldout="false"></listHandle>
    </div>
    user
  </div>
</template>
<script>
import { listHandle } from '@/components'
export default {
  data () {
    return {
    }
  },
  components: {
    listHandle
  }
}
</script>
