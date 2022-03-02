<script lang="ts">
import { defineComponent } from 'vue'
import { getProxyAddress } from '../../api/proxy'

export default defineComponent({
  name: 'NavBar',
  data() {
    return {
      proxyAddress: '',
      show: false
    }
  },
  created() {
    getProxyAddress().then((data) => {
      this.proxyAddress = data
    })
  },
  methods: {
    showOrClose() {
      this.show = !this.show
    }
  }
})
</script>

<template>
  <div class="navbar-container flex flex-col h-full">
    <div class="navbar bg-base-100">
      <div class="flex-none">
        <label for="my-drawer" class="btn btn-squire btn-ghost drawer-button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </label>
      </div>
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl">Hfilter</a>
      </div>
      <div class="flex-none">
        <div class="flex-row flex items-center">
          <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2056" width="18" height="18"><path d="M593.94368 715.648a10.688 10.688 0 0 0-14.976 0L424.21568 870.4c-71.68 71.68-192.576 79.232-271.68 0-79.232-79.232-71.616-200 0-271.616l154.752-154.752a10.688 10.688 0 0 0 0-15.04l-52.992-52.992a10.688 10.688 0 0 0-15.04 0L84.50368 530.688a287.872 287.872 0 0 0 0 407.488 288 288 0 0 0 407.488 0l154.752-154.752a10.688 10.688 0 0 0 0-15.04l-52.736-52.736z m344.384-631.168a288.256 288.256 0 0 1 0 407.616l-154.752 154.752a10.688 10.688 0 0 1-15.04 0l-52.992-52.992a10.688 10.688 0 0 1 0-15.104l154.752-154.688c71.68-71.68 79.232-192.448 0-271.68-79.104-79.232-200-71.68-271.68 0L443.92768 307.2a10.688 10.688 0 0 1-15.04 0l-52.864-52.864a10.688 10.688 0 0 1 0-15.04l154.88-154.752a287.872 287.872 0 0 1 407.424 0z m-296.32 240.896l52.672 52.736a10.688 10.688 0 0 1 0 15.04l-301.504 301.44a10.688 10.688 0 0 1-15.04 0l-52.736-52.672a10.688 10.688 0 0 1 0-15.04l301.632-301.504a10.688 10.688 0 0 1 15.04 0z" fill="#ffffff" p-id="2057" /></svg>
          <div class="normal-case text mx-4"><span class="font-bold">
            Proxy started at: </span>{{ proxyAddress }}</div>
        </div>
      </div>
    </div>
    <div class="flex-1 top-16 drawer rounded">
      <input
        id="my-drawer"
        type="checkbox"
        :checked="show"
        class="drawer-toggle"
      >
      <div class="drawer-content relative">
        <slot />
      </div>
      <div class="drawer-side h-full">
        <label for="my-drawer" class="drawer-overlay" />
        <ul
          class="menu
          px-4 overflow-y-auto w-80
          bg-base-100 text-base-content"
        >
          <li><router-link to="/" class="rounded">Home</router-link></li>
          <li><router-link to="/rule" class="rounded">Rule</router-link></li>
          <li><router-link to="/cert" class="rounded">Cert</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scope>
</style>
