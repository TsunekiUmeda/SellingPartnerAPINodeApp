import { DefaultApiClient } from '../lib/DefaultApiClient'

const ApiOptions = {
  method: 'GET',
  pathname: '/sellers/v1/marketplaceParticipations',
}

export class SellersApi extends DefaultApiClient {
  constructor() {
    super(ApiOptions)
  }

  async getMarketplaceParticipations(): Promise<void> {
    return await this.call()
  }
}
