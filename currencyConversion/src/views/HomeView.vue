<template>
  <div class="home">
    <h1 class="title">Курсы валют</h1>
    
    <div class="card">
      <div class="currency-selector">
        <label for="currency" class="selector-label">Базовая валюта:</label>
        <Dropdown 
          id="currency"
          v-model="baseCurrency"
          :options="currencyOptions" 
          optionLabel="label"
          optionValue="value"
          class="currency-dropdown"
        />
      </div>
      
      <div v-if="currencyStore.loading" class="loading">
        <i class="pi pi-spinner pi-spin spinner-icon"></i>
        <p>Загрузка курсов валют...</p>
      </div>
      
      <div v-else-if="currencyStore.error" class="error">
        <i class="pi pi-exclamation-triangle error-icon"></i>
        <p>{{ currencyStore.error }}</p>
      </div>
      
      <div v-else class="rates-container">
        <div v-for="item in ratesList" :key="item.currency" class="rate-card">
          <span class="rate-value">1 {{ baseCurrency }} = {{ item.rate }} {{ item.currency }}</span>
        </div>
      </div>
    </div>
    
    <RouterLink to="/convert" class="converter-link">
      <Button label="Конвертер валюты" class="converter-button" />
    </RouterLink>
  </div>
</template>

<script setup>
import { useCurrencyStore } from '@/stores/currency'
import { onMounted, computed, ref, watch } from 'vue'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'

const currencyStore = useCurrencyStore();
const baseCurrency = ref(currencyStore.baseCurrency)
const currencyOptions = [
  { label: 'Евро (EUR)', value: 'EUR' },
  { label: 'Доллар (USD)', value: 'USD' },
  { label: 'Рубль (RUB)', value: 'RUB' }
]

const ratesList = computed(() => {
  if (!currencyStore.exchangeRates) {
    return []
  }  
  
  const baseRate = currencyStore.exchangeRates[baseCurrency.value]
  
  return Object.entries(currencyStore.exchangeRates)
    .filter(([currency]) => currency !== baseCurrency.value)
    .map(([currency, rate]) => ({
      currency,
      rate: (rate / baseRate).toFixed(3)
    }))
  return []
})

onMounted(() => {
  currencyStore.fetchRates()
})

watch(baseCurrency, (newValue) => {
  currencyStore.setBaseCurrency(newValue)
})
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2rem;
}

.title {
  margin-bottom: 2rem;
  color: var(--primary-color);
}

.card {
  width: 100%;
  max-width: 500px;
  background: var(--surface-card);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.currency-selector {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}

.selector-label {
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.currency-dropdown {
  width: 100%;
}

.loading, .error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  text-align: center;
  padding: 2rem;
}

.spinner-icon {
  font-size: 2rem;
  color: var(--primary-color);
}

.error-icon {
  font-size: 2rem;
  color: var(--red-500);
}

.rates-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.rate-card {
  background: var(--surface-ground);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
}

.rate-value {
  font-size: 1rem;
  font-weight: 500;
}

.converter-link {
  margin-top: 2rem;
  text-decoration: none;
}

.converter-button {
  width: 200px;
}
</style>