import { defineStore } from 'pinia'
import { reactive, computed, toRefs } from 'vue'
import axios from 'axios'

export const useCurrencyStore = defineStore('currency', () => {
    const state = reactive({
        baseCurrency: 'RUB',
        loading: false,
        error: null,
        currencies: {
            USD: 0,
            EUR: 0,
            RUB: 1,
        }, 
        amount: 1,
        fromCurrency: 'RUB',
        toCurrency: 'USD',
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
    const exchangeRates = computed(() => state.currencies)
    const setBaseCurrency = async (currency) => {
        state.baseCurrency = currency
        await fetchRates()
    }

    const fetchRates = async () => {
        try {
            state.loading = true
            state.error = null
            
            const { data } = await axios('https://status.neuralgeneration.com/api/currency')
            
            const currencyMappings = {
                RUB: {
                    USD: data['rub-usd'],
                    EUR: data['rub-eur'],
                    RUB: 1,
                },
                EUR: {
                    USD: data['eur-usd'],
                    RUB: data['eur-rub'],
                    EUR: 1,
                },
                USD: {
                    EUR: data['usd-eur'],
                    RUB: data['usd-rub'],
                    USD: 1,
                },
            }
            
            state.currencies = currencyMappings[state.baseCurrency]
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
        exchangeRates,
        fetchRates,
        setBaseCurrency,
    }
}, {
    persist: {
        paths: ['baseCurrency', 'amount', 'fromCurrency', 'toCurrency'],
    }
})