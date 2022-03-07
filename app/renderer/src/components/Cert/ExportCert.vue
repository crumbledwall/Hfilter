<script setup lang="ts">
import { exportCert } from '../../api/proxy'
import { ref } from 'vue'
import type { ResponseData } from '../../utils/interface'
import AlertMessage from '../Common/AlertMessage.vue'

const message = ref<string>('')
const show = ref<boolean>(false)

const callExportCert = () => {
  exportCert().then((res) => { if (res) alertMessage(res) })
}
const alertMessage = (res:ResponseData) => {
  message.value = res.message
  show.value = true
  setTimeout(() => {
    show.value = false
  }, 2000)
}

</script>

<template>
  <div class="h-full w-full flex flex-col items-center p-32">
    <AlertMessage :show="show" :message="message" />
    <div class="card w-full h-full bg-neutral text-neutral-content">
      <div class="card-body items-center text-center">
        <h2 class="card-title">Export the Cert</h2>
        <p>You can import the the Cert to your Web browser
          for proxying https requests.</p>
        <div class="justify-end card-actions">
          <button
            class="btn btn-primary"
            @click="callExportCert"
          >Export</button>
        </div>
      </div>
    </div>
  </div>
</template>
