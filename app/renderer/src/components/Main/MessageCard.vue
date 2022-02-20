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
    this.message = await ipcRequest<string>('hello', 'hello from renderer')
  }
})

</script>

<template>
  <div class="text-xl p-4">{{ message }}</div>
</template>
