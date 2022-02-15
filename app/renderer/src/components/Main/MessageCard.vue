<script lang="ts">
import { defineComponent } from 'vue'
import ipcRequest from '../../utils/ipcRequest'

export default defineComponent({
  name: 'MessageCard',
  data() {
    return {
      message: ''
    }
  },
  async created() {
    this.message = await ipcRequest<string>('helloReq', 'helloRes', 'hello from renderer')
  }
})

</script>

<template>
    <div>
shows: {{message}}
    </div>
</template>

<style scope>
</style>
