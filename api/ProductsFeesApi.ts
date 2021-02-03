import { DefaultApiClient } from '../lib/DefaultApiClient'
interface ProductFeesApiData {
  FeesEstimateRequest: {
    MarketplaceId: string
    PriceToEstimateFees: {
      ListingPrice: {
        CurrencyCode: string
        Amount: number
      }
    }
    Identifier: string
  }
}
export class ProductFeesApi extends DefaultApiClient {
  constructor(private ProductId: string, private data: string) {
    super({
      method: 'POST',
      pathname: `/products/fees/v0/listings/${ProductId}/feesEstimate`,
      data: data,
    })
  }

  getMyFeesEstimateForSKU = async (): Promise<void> => {
    this.call()
  }

  getMyFeesEstimateForASIN = async (): Promise<void> => {
    this.call()
  }
}
