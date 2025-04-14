<template>
  <div class="base-input">
    <label v-if="label" class="block text-sm font-medium mb-1">{{ label }}</label>
    
    <div class="p-inputgroup">
      <InputText
        ref="inputRef"
        :modelValue="modelValue"
        @update:modelValue="value => emit('update:modelValue', value)"
        :placeholder="placeholder"
        :disabled="disabled"
        class="w-full"
      />
      
      <Button
        v-if="copyable"
        icon="pi pi-copy"
        @click="copyToClipboard"
        :disabled="!modelValue || disabled"
        v-tooltip="'Скопировать'"
        class="p-button-secondary"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  copyable: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const inputRef = ref(null)

async function copyToClipboard() {
  if (!props.modelValue) return;
  
  try {
    await navigator.clipboard.writeText(String(props.modelValue));
    toast.add({
      severity: 'success',
      summary: 'Скопировано',
      detail: 'Текст успешно скопирован в буфер обмена',
      life: 3000
    });
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Не удалось скопировать текст',
      life: 3000
    });
  }
}
</script>

<style scoped>
.base-input {
  margin-bottom: 1rem;
}

.p-inputgroup {
  display: flex;
  align-items: stretch;
}

:deep(.p-inputtext) {
  flex: 1;
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

:deep(.p-button) {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}
</style>