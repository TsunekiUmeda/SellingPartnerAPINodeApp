import { DefaultApiClient } from '../lib/DefaultApiClient'

export class SellersApi {
  private methodName = 'GET'
  private pathName = '/sellers/v1/marketplaceParticipations'

  getMarketplaceParticipations = async () => {
    new DefaultApiClient(this.methodName, this.pathName).call()
  }
}
