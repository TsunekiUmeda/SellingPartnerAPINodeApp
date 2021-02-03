import { SellersApi } from './api/SellersApi'
import { ProductFeesApi } from './api/ProductsFeesApi'

console.log('start')

// new ProductFeesApi('thisisatest').getMyFeesEstimateForSKU()
new SellersApi().getMarketplaceParticipations()

console.log('end')
