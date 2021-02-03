import { DefaultApiClient } from '../lib/DefaultApiClient'

export class ProductFeesApi {
  private methodName = 'POST'
  data = JSON.stringify({
    FeesEstimateRequest: {
      MarketplaceId: 'ATVPDKIKX0DER',
      PriceToEstimateFees: {
        ListingPrice: {
          CurrencyCode: 'USD',
          Amount: 10,
        },
      },
      Identifier: '100',
    },
  })

  constructor() {}

  getMyFeesEstimateForSKU = async (sellerSKU: string): Promise<void> => {
    new DefaultApiClient(
      this.methodName,
      `/products/fees/v0/listings/${sellerSKU}/feesEstimate`,
      this.data
    ).call()
  }

  getMyFeesEstimateForASIN = async (asin: string): Promise<void> => {
    new DefaultApiClient(
      this.methodName,
      `/products/fees/v0/listings/${asin}/feesEstimate`,
      this.data
    ).call()
  }
}
