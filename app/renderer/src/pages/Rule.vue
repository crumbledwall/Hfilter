<script lang="ts">
import { defineComponent } from 'vue'
import AddRule from '../components/Rule/AddRule.vue'

export default defineComponent({
  name: 'Rule',
  components: {
    AddRule
  }
})
</script>

<template>
  <div>
    <AddRule />
  </div>
</template>
