import { DefaultApiClient } from '../lib/DefaultApiClient'

const ApiOptions = {
  method: 'GET',
  pathname: '/sellers/v1/marketplaceParticipations',
}

export class SellersApi extends DefaultApiClient {
  constructor() {
    super(ApiOptions)
  }

  async getMarketplaceParticipations() {
    return await this.call()
  }
}
