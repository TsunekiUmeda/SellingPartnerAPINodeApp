import { DefaultApiClient } from './DefaultApiClient'

export class SellersApi {
  private pathname = '/sellers/v1/marketplaceParticipations'
  private method = 'GET'

  getMarketplaceParticipations = async () => {
    new DefaultApiClient(this.method, this.pathname).call()
  }
}
