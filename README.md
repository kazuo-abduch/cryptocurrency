# CryptoCurrency

This is a project for consulting usd prices of cryptocurrencies in real time, or on a specific date using Vue.js and Tailwindcss.

## Setup

When downloading the project, make sure to install the dependencies:

**NPM**
```
npm install
```
**YARN**
```
yarn install
```

## Customize your CryptoCurrency

Although this project has only 5 currencies, it is possible to add more as long as it exists inside the CoinGecko database.
In the component file `SelectCrypto.vue` you will find an Array of string `currencies` declared in the local state holding the currencies names for search. There you can add as many currencies as you want.
For the api search to work properly, first you have to search in the CoinGecko documentation what is the corresponding currency id. That id is going to be used on both `fetch` functions in the file `geckoApi.js` inside the `service` folder. All you have to do is make sure that the `currencyUrl` variable is equal the currency id you have selected in the `SelectCrypto.vue` component.


### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
