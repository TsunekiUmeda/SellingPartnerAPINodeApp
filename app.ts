import { SellersApi } from './lib/SellersApi'
import { ProductFeesApi } from './lib/ProductsFeesApi'

console.log('start')

// const accessToken = new Auth().requestAccessToken()
new ProductFeesApi('thisisatest').getMyFeesEstimateForSKU()
// new SellersApi().call()

console.log('end')

// new Auth().call()
// setAccessToken('test')
// console.log(getAccessToken())
