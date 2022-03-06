<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import { addRule } from '../../api/proxy'
import type { Rule } from '../../utils/interface'
import RuleTab from './RuleTab.vue'
import validator from '../../utils/validator'
import type { Values, InternalRuleItem, Value } from 'async-validator'
import AlertMessage from '../Common/AlertMessage.vue'

const rule = ref<Rule>({
  domain: '',
  position: 'header',
  type: 'add',
  old: '',
  new: '',
  key: '',
  content: ''
})
const show = ref<boolean>(false)
const message = ref<string>('')

const validateRules = reactive({
  domain: [
    {
      required: true,
      message: 'Domain name can not be empty'
    },
    {
      pattern: /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/,
      message: 'Invalid domain format'
    }
  ],
  content: [
    {
      validator(_rule: InternalRuleItem, value: Value, _callback: any,
        source: Values) {
        const errors: any[] = []
        if ((source.type === 'add' ||
        source.type === 'remove') &&
        !value &&
        value.trim().length === 0) {
          errors.push({ message: 'Content can not be empty' })
        }
        return errors
      }
    }
  ],
  key: [
    {
      validator(_rule: InternalRuleItem, value: Value, _callback: any,
        source: Values) {
        const errors: any[] = []
        if (source.position === 'header' &&
        !value &&
        value.trim().length === 0) {
          errors.push({ message: 'Header key can not be empty' })
        }
        return errors
      }
    }
  ],
  old: [
    {
      validator(_rule: InternalRuleItem, value: Value, _callback: any,
        source: Values) {
        const errors: any[] = []
        if (source.type === 'replace' &&
        !value &&
        value.trim().length === 0) {
          errors.push({ message: 'Old value can not be empty' })
        }
        return errors
      }
    }
  ],
  new: [
    {
      validator(_rule: InternalRuleItem, value: Value, _callback: any,
        source: Values) {
        const errors: any[] = []
        if (source.type === 'replaces' &&
        !value &&
        value.trim().length === 0) {
          errors.push({ message: 'New value can not be empty' })
        }
        return errors
      }
    }
  ]
})

const submitRule = () => {
  validator(rule.value, validateRules, (errors) => {
    if (errors) {
      message.value = errors[0].message
      show.value = true
      setTimeout(() => {
        show.value = false
      }, 2000)
    } else {
      addRule({ ...rule.value }).then((res) => {
        console.log(res)
      })
    }
  })
}

const clearForm = () => {
  rule.value.key = ''
  rule.value.content = ''
  rule.value.old = ''
  rule.value.new = ''
}

watch(() => [rule.value.position, rule.value.type], () => {
  clearForm()
})

</script>

<template>
  <div class="h-full w-full flex flex-col items-center p-10">
    <AlertMessage :message="message" :show="show" />
    <div class="card w-full h-full bg-neutral text-neutral-content">
      <div class="card-body">
        <h2 class="card-title ml-4">Add Rules</h2>
        <div class="grid grid-cols-2 justify-items-center gap-4 mt-4">
          <div class="form-control w-full">
            <label class="input-group input-group-md">
              <span class="w-28 justify-center">Domain</span>
              <input
                v-model="rule.domain"
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
                <option v-if="rule.position === 'body'" value="raw">Raw</option>
              </select>
            </div>
          </div>
        </div>
        <div class="mt-10 add-header-card flex flex-col relative">
          <RuleTab
            :position="'header'"
            :type="'add'"
            :rule="rule"
          >
            <div class="form-control w-full">
              <label class="input-group">
                <span class="w-24 justify-center">Key</span>
                <input
                  v-model="rule.key"
                  spellcheck="false"
                  type="text"
                  placeholder="Key"
                  class="input input-bordered w-full"
                >
              </label>
            </div>
            <textarea
              v-model="rule.content"
              class="my-8 textarea textarea-bordered"
              placeholder="Value"
              rows="1"
            />
          </RuleTab>
          <RuleTab
            :position="'header'"
            :type="'replace'"
            :rule="rule"
          >
            <div class="form-control w-full">
              <label class="input-group">
                <span class="w-36 justify-center">Header Key</span>
                <input
                  v-model="rule.key"
                  spellcheck="false"
                  type="text"
                  placeholder="Key"
                  class="input input-bordered w-full"
                >
              </label>
            </div>
            <textarea
              v-model="rule.content"
              class="my-8 textarea textarea-bordered"
              placeholder="Value"
              rows="1"
            />
          </RuleTab>
          <RuleTab
            :position="'header'"
            :type="'remove'"
            :rule="rule"
          >
            <div class="form-control w-full">
              <label class="input-group">
                <span class="w-36 justify-center">Header Key</span>
                <input
                  v-model="rule.key"
                  spellcheck="false"
                  type="text"
                  placeholder="Key"
                  class="input input-bordered w-full"
                >
              </label>
            </div>
          </RuleTab>
          <RuleTab
            :position="'body'"
            :type="'add'"
            :rule="rule"
          >
            <textarea
              v-model="rule.content"
              class="mb-8 textarea textarea-bordered"
              placeholder="Append Raw"
            />
          </RuleTab>
          <RuleTab
            :position="'body'"
            :type="'replace'"
            :rule="rule"
          >
            <textarea
              v-model="rule.old"
              class="mb-8 textarea textarea-bordered"
              placeholder="Before"
              rows="1"
            />
            <textarea
              v-model="rule.new"
              class="textarea textarea-bordered"
              placeholder="Replace With"
              rows="1"
            />
          </RuleTab>
          <RuleTab
            :position="'body'"
            :type="'remove'"
            :rule="rule"
          >
            <textarea
              v-model="rule.content"
              class="mb-8 textarea textarea-bordered"
              placeholder="Remove"
              rows="2"
            />
          </RuleTab>
          <RuleTab
            :position="'body'"
            :type="'raw'"
            :rule="rule"
          >
            <textarea
              v-model="rule.content"
              class="mb-8 textarea textarea-bordered"
              placeholder="Raw"
              rows="2"
            />
          </RuleTab>
        </div>
        <div class="justify-end card-actions mt-auto">
          <button
            class="btn btn-error mr-4 w-28"
            @click="submitRule"
          >Cancel</button>
          <button
            class="btn btn-primary w-28"
            @click="submitRule"
          >Add Rule</button>
        </div>
      </div>
    </div>
  </div>
</template>
