<script setup lang="ts">
import { defineProps, computed } from 'vue'
import type { Rule } from '../../utils/interface'

const props = defineProps({
  position: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  rule: {
    type: Object,
    default: {} as Rule
  }
})

const showTab = computed(() => {
  if (props.position === props.rule.position &&
      props.type === props.rule.type) {
    return true
  }
  return false
})

</script>

<template>
  <transition
    enter-active-class="duration-1000 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    mode="out-in"
  >
    <div v-if="showTab" class="flex flex-col">
      <slot />
    </div>
  </transition>
</template>
