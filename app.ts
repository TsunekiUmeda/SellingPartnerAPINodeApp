import { SellersApi } from './lib/SellersApi'

console.log('start')

// const accessToken = new Auth().requestAccessToken()

new SellersApi().call()
console.log('end')

// new Auth().call()
// setAccessToken('test')
// console.log(getAccessToken())
