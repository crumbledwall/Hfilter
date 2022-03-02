<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AlertMessage',
  props: {
    message: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    showAlert() {
      return this.show ? '' : 'opacity-0'
    }
  }
})

</script>

<template>
  <div
    :class="`absolute top-4 alert shadow-lg alert-info w-2/3 duration-300
      ${showAlert()}`"
  >
    <div class="w-full">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span class="text-center w-full">{{ message }}</span>
    </div>
  </div>
</template>
