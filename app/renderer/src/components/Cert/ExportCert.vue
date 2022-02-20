<script lang="ts">
import { exportCert } from '../../api/proxy'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MessageCard',
  data() {
    return {
      message: '',
      show: false
    }
  },
  methods: {
    exportCert() {
      exportCert().then((msg) => { if (msg) this.alertMessage(msg) })
    },
    alertMessage(msg: string) {
      this.message = msg
      this.show = true
      setTimeout(() => {
        this.show = false
      }, 2000)
    },
    showAlert() {
      return this.show ? '' : 'opacity-0'
    }
  }
})

</script>

<template>
  <div class="h-full w-full flex flex-col items-center">
    <div
      :class="`alert shadow-lg alert-info w-2/3 duration-300
      ${showAlert()}`"
    >
      <div class="w-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span class="text-center w-full">{{ message }}</span>
      </div>
    </div>
    <div class="card w-96 h-52 mt-10 bg-neutral text-neutral-content">
      <div class="card-body items-center text-center">
        <h2 class="card-title">Export the Cert</h2>
        <p>You can import the the Cert to your Web browser
          for proxying https requests.</p>
        <div class="justify-end card-actions">
          <button class="btn btn-primary" @click="exportCert">Export</button>
        </div>
      </div>
    </div>
  </div>
</template>
