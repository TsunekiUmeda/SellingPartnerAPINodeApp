import { DefaultApiClient } from '../lib/DefaultApiClient'

export class ProductFeesApi {
  private methodName = 'POST'
  private pathName = `/products/fees/v0/listings/${this.SellerSKU}/feesEstimate`
  constructor(private SellerSKU: string) {}

  getMyFeesEstimateForSKU = async (): Promise<void> => {
    const data = JSON.stringify({
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
    new DefaultApiClient(this.methodName, this.pathName, data).call()
  }
}
