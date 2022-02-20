<script setup lang="ts">
import NavBar from './components/Common/NavBar.vue'
</script>

<template>
  <div class="main h-screen w-screen flex flex-col">
    <NavBar>
      <router-view class="h-full w-full" />
    </NavBar>
  </div>
</template>
