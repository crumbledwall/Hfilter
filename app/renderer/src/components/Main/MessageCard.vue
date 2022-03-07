<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ipcRequest from '../../utils/ipcRequest'

const message = ref<string>('')
onMounted(async() => {
  message.value = await ipcRequest<string>('hello', 'hello from renderer')
})
</script>

<template>
  <div class="text-xl p-4">{{ message }}</div>
</template>
