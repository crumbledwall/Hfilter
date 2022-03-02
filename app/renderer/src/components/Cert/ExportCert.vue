<script lang="ts">
import { exportCert } from '../../api/proxy'
import { defineComponent } from 'vue'
import type { ResponseData } from '../../utils/interface'
import AlertMessage from '../Common/AlertMessage.vue'

export default defineComponent({
  name: 'ExportCert',
  components: {
    AlertMessage
  },
  data() {
    return {
      message: '',
      show: false
    }
  },
  methods: {
    exportCert() {
      exportCert().then((res) => { if (res) this.alertMessage(res) })
    },
    alertMessage(res:ResponseData) {
      this.message = res.message
      this.show = true
      setTimeout(() => {
        this.show = false
      }, 2000)
    }
  }
})

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
          <button class="btn btn-primary" @click="exportCert">Export</button>
        </div>
      </div>
    </div>
  </div>
</template>
