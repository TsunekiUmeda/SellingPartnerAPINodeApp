import { DefaultApiClient } from '../lib/DefaultApiClient'
import * as qs from 'qs'

export class ProductPricingApi {
  private pathName = '/products/pricing/v0'

  getPricing = async (ItemType: string, productId: string): Promise<void> => {
    const params = {
      Asins: productId,
      ItemType,
      MarketplaceId: 'ATVPDKIKX0DER',
      SellerSku: productId,
    }
    if (ItemType === 'Asin') {
      delete params.SellerSku
    } else {
      delete params.Asins
    }

    const options = {
      method: 'GET',
      pathname: this.pathName + '/price',
      params,
    }
    console.log('options getPrice', options.params)
    new DefaultApiClient(options).call()
  }
}
