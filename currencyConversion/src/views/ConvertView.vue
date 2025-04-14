<template>
  <Card class="converter-card">
    <template #title>Конвертер валют</template>
    <template #content>
      <div class="converter-grid p-fluid">
        <div class="field">
          <label for="amount">Сумма</label>
          <InputNumber 
            id="amount"
            v-model="currencyStore.amount" 
            mode="decimal" 
            :minFractionDigits="2"
            :maxFractionDigits="6"
            showButtons
            :min="0"
            :max="1000000000"
          />
        </div>

        <div class="field">
          <label for="from-currency">Из</label>
          <Dropdown 
            id="from-currency"
            v-model="currencyStore.fromCurrency" 
            :options="currencies" 
            placeholder="Выберите валюту"
          />
        </div>

        <div class="swap-btn">
          <Button 
            icon="pi pi-sort-alt" 
            class="p-button-rounded p-button-text"
            @click="swapCurrencies"
            v-tooltip="'Поменять валюты местами'"
          />
        </div>

        <div class="field">
          <label for="to-currency">В</label>
          <Dropdown 
            id="to-currency"
            v-model="currencyStore.toCurrency" 
            :options="currencies" 
            placeholder="Выберите валюту"
          />
        </div>
      </div>

      <div class="result-container">
        <div class="result">
          <span class="amount">{{ currencyStore.amount }}</span>
          <span class="currency">{{ currencyStore.fromCurrency }}</span>
          <span class="equals">=</span>
          <span class="amount">{{ currencyStore.convertedAmount.toFixed(4) }}</span>
          <span class="currency">{{ currencyStore.toCurrency }}</span>
        </div>

        <Button 
          icon="pi pi-copy" 
          label="Копировать" 
          class="p-button-outlined"
          @click="copyResult"
        />
      </div>
    </template>
  </Card>

  <div class="navigation">
    <RouterLink to="/">
      <Button icon="pi pi-home" label="На главную" class="p-button-text" />
    </RouterLink>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useCurrencyStore } from '@/stores/currency'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import Card from 'primevue/card'

const currencyStore = useCurrencyStore()
const toast = useToast()
const currencies = ['USD', 'EUR', 'RUB']

onMounted(() => {
  currencyStore.fetchRates()
})

function swapCurrencies() {
  const from = currencyStore.fromCurrency
  currencyStore.fromCurrency = currencyStore.toCurrency
  currencyStore.toCurrency = from
}

function copyResult () {
  const text = `${currencyStore.amount} ${currencyStore.fromCurrency} = ${currencyStore.convertedAmount} ${currencyStore.toCurrency}`
  navigator.clipboard.writeText(text)
    .then(() => {
      toast.add({
        severity: 'success',
        summary: 'Скопировано',
        detail: 'Результат скопирован в буфер обмена',
        life: 3000
      })
    })
}
</script>

<style scoped>
.converter-card {
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
}

.converter-grid {
  display: grid;
  grid-template-columns: 2fr 1.5fr 50px 1.5fr;
  gap: 1rem;
  align-items: end;
  margin-bottom: 2rem;
}

.swap-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -0.2rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.result-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
}

.result {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  font-size: 1.5rem;
}

.amount {
  font-weight: bold;
  color: var(--primary-color);
}

.equals {
  margin: 0 0.5rem;
}

.navigation {
  margin-top: 1rem;
}
</style>