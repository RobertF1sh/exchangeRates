import { defineStore } from 'pinia'
import { reactive, computed, toRefs } from 'vue'
import { createCurrencyMappings } from '@/metadata'
import axios from 'axios'

export const useCurrencyStore = defineStore(
  'currency',
  () => {
    const state = reactive({
      baseCurrency: 'RUB',
      loading: false,
      error: null,
      currencies: {
        USD: 0,
        EUR: 0,
        RUB: 1,
      },
      rates: {},
    })

    const convertedAmount = computed(() => {
      void fetchRates()

      if (!state.amount || state.amount === 0) return 0

      if (state.fromCurrency === state.toCurrency) return state.amount

      if (state.fromCurrency === state.baseCurrency) {
        const rate = state.currencies[state.toCurrency]
        return rate ? state.amount * rate : 0
      }

      const fromRate = state.currencies[state.fromCurrency]
      const toRate = state.currencies[state.toCurrency]

      if (fromRate && toRate) {
        return (state.amount / fromRate) * toRate
      }

      return 0
    })
    const setBaseCurrency = async (currency) => {
      state.baseCurrency = currency
      await fetchRates()
    }

    const fetchRates = async () => {
      try {
        state.loading = true
        state.error = null

        const { data } = await axios('https://status.neuralgeneration.com/api/currency')

        const currencyMappings = createCurrencyMappings(data)

        state.currencies = currencyMappings[state.baseCurrency]
        state.rates = data
      } catch (err) {
        state.error = 'Не удалось загрузить курсы валют'
        throw new Error(err)
      } finally {
        state.loading = false
      }
    }

    return {
      ...toRefs(state),
      convertedAmount,
      fetchRates,
      setBaseCurrency,
    }
  },
  {
    persist: {
      paths: ['baseCurrency'],
    },
  },
)
