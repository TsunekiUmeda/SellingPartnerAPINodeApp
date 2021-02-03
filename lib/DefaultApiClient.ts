import * as https from 'https'
import { awsSigner } from './awsSigner'

export interface ApiOptions {
  method: string
  pathname: string
  MarketplaceId?: string
  ItemType?: string
  Asins?: string
  SellerSku?: string
  data?: {}
}
export class DefaultApiClient {
  constructor(private apiOptions: ApiOptions) {}

  protected call = async () => {
    const signed = await new awsSigner(this.apiOptions).awsSigner()

    const signedOptions = {
      hostname: signed.hostname,
      path: signed.pathname(),
      MarketplaceId: 'ATVPDKIKX0DER',
      method: signed.method,
      headers: signed.headers,
    }

    const req = https.request(signedOptions, res => {
      console.log('Sellers API statusCode:', res.statusCode)

      res.on('data', d => {
        process.stdout.write(d)
      })
    })

    req.on('error', e => {
      console.error(e)
    })

    if (this.apiOptions.method === 'POST') {
      req.write(this.apiOptions.data)
    }

    req.end()
  }
}
