export const createCurrencyMappings = (data) => ({
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
})
export const currencyOptions = [
  { label: 'Евро (EUR)', value: 'EUR' },
  { label: 'Доллар (USD)', value: 'USD' },
  { label: 'Рубль (RUB)', value: 'RUB' },
]
export const currencies = ['USD', 'EUR', 'RUB']
