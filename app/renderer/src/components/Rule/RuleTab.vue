<script lang="ts">
import { defineComponent } from 'vue'
import type { Rule } from '../../utils/interface'

export default defineComponent({
  name: 'RuleTab',
  props: {
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
  },
  methods: {
    showTab() {
      if (this.position === this.rule.position &&
      this.type === this.rule.type) {
        return true
      }
      return false
    }
  }
})
</script>

<template>
  <transition
    enter-active-class="duration-1000 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    mode="out-in"
  >
    <div v-if="showTab()" class="flex flex-col">
      <slot />
    </div>
  </transition>
</template>
