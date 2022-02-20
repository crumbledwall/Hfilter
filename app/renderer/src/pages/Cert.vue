<script lang="ts">
import { defineComponent } from 'vue'
import ExportCert from '../components/Cert/ExportCert.vue'

export default defineComponent({
  name: 'Cert',
  components: {
    ExportCert
  }
})
</script>

<template>
  <div>
    <ExportCert />
  </div>
</template>
