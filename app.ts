import { SellersApi } from './lib/SellersApi'
import { ProductFeesApi } from './lib/ProductsFeesApi'

console.log('start')

// new ProductFeesApi('thisisatest').getMyFeesEstimateForSKU()
new SellersApi().getMarketplaceParticipations()

console.log('end')
