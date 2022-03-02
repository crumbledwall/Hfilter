<script lang="ts">
import { defineComponent } from 'vue'
import type { Rule } from '../../utils/interface'
import { addRule } from '../../api/proxy'
import RuleTab from './RuleTab.vue'

export default defineComponent({
  name: 'AddRule',
  components: {
    RuleTab
  },
  data() {
    return {
      rule: {
        position: 'header',
        type: 'add'
      } as Rule
    }
  },
  methods: {
    addRule() {
      console.log('debug method', this.rule)
      addRule({ ...this.rule }).then((res) => {
        console.log(res)
      })
    }
  }
})

</script>

<template>
  <div class="h-full w-full flex flex-col items-center p-10">
    <div class="card w-full h-full bg-neutral text-neutral-content">
      <div class="card-body">
        <h2 class="card-title ml-4">Add Rules</h2>
        <div class="grid grid-cols-2 justify-items-center gap-8 mt-4">
          <div class="form-control w-full">
            <label class="input-group input-group-md">
              <span class="w-28 justify-center">Domain</span>
              <input
                spellcheck="false"
                type="text"
                placeholder="example.com"
                class="input input-bordered input-md w-full"
              >
            </label>
          </div>
          <div class="form-control w-full">
            <div class="input-group input-group-md">
              <span class="w-28 justify-center">Position</span>
              <select
                v-model="rule.position"
                class="select select-bordered shrink w-full"
              >
                <option value="header" selected>Header</option>
                <option value="body">Body</option>
              </select>
            </div>
          </div>
          <div class="form-control w-full">
            <div class="input-group input-group-md">
              <span class="w-28 justify-center">Type</span>
              <select
                v-model="rule.type"
                class="select select-bordered shrink w-full"
              >
                <option value="add" selected>Add</option>
                <option value="replace">Replace</option>
                <option value="remove">Remove</option>
              </select>
            </div>
          </div>
        </div>
        <div class="mt-10 add-header-card flex flex-col relative">
          <RuleTab :position="'header'" :type="'add'" :rule="rule">
            <div class="form-control w-full">
              <label class="input-group">
                <span class="w-36 justify-center">Header Key</span>
                <input
                  spellcheck="false"
                  type="text"
                  placeholder="Key"
                  class="input input-bordered w-full"
                >
              </label>
            </div>
            <textarea
              class="my-8 textarea textarea-bordered"
              placeholder="Value"
              rows="1"
            />
          </RuleTab>
          <RuleTab :position="'header'" :type="'replace'" :rule="rule">
            <div class="form-control w-full">
              <label class="input-group">
                <span class="w-36 justify-center">Header Key</span>
                <input
                  spellcheck="false"
                  type="text"
                  placeholder="Key"
                  class="input input-bordered w-full"
                >
              </label>
            </div>
            <textarea
              class="my-8 textarea textarea-bordered"
              placeholder="Value"
              rows="1"
            />
          </RuleTab>
          <RuleTab :position="'header'" :type="'remove'" :rule="rule">
            <div class="form-control w-full">
              <label class="input-group">
                <span class="w-36 justify-center">Header Key</span>
                <input
                  spellcheck="false"
                  type="text"
                  placeholder="Key"
                  class="input input-bordered w-full"
                >
              </label>
            </div>
          </RuleTab>
          <RuleTab :position="'body'" :type="'add'" :rule="rule">
            <textarea
              class="mb-8 textarea textarea-bordered"
              placeholder="Append Raw"
            />
          </RuleTab>
          <RuleTab :position="'body'" :type="'replace'" :rule="rule">
            <textarea
              class="mb-8 textarea textarea-bordered"
              placeholder="Before"
              rows="1"
            />
            <textarea
              class="textarea textarea-bordered"
              placeholder="Replace With"
              rows="1"
            />
          </RuleTab>
          <RuleTab :position="'body'" :type="'remove'" :rule="rule">
            <textarea
              class="mb-8 textarea textarea-bordered"
              placeholder="Remove Raw"
              rows="1"
            />
          </RuleTab>
        </div>
        <div class="justify-end card-actions mt-auto">
          <button class="btn btn-primary" @click="addRule">Add Rule</button>
        </div>
      </div>
    </div>
  </div>
</template>
