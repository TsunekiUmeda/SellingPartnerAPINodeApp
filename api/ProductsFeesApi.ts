import { DefaultApiClient } from '../lib/DefaultApiClient'
type FeesEstimateData = {
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

export class ProductFeesApi {
  private async getMyFeesEstimate(productId: string, data: FeesEstimateData) {
    await new DefaultApiClient({
      method: 'POST',
      pathname: `/products/fees/v0/listings/${productId}/feesEstimate`,
      data: data,
    }).call()
  }

  getMyFeesEstimateForSKU = async (
    sellerSKU: string,
    data: FeesEstimateData
  ): Promise<void> => {
    await this.getMyFeesEstimate(sellerSKU, data)
  }

  getMyFeesEstimateForASIN = async (
    asin: string,
    data: FeesEstimateData
  ): Promise<void> => {
    await this.getMyFeesEstimate(asin, data)
  }
}
