import * as https from 'https'
import { awsSigner } from './awsSigner'

export interface ApiOptions {
  method: string
  pathname: string
  params?: {
    MarketplaceId?: string
    ItemType?: string
    Asins?: string
    SellerSku?: string
  }
  data?: {}
}

export class DefaultApiClient {
  constructor(private apiOptions: ApiOptions) {}

  call = async (): Promise<void> => {
    console.log('apiOptions', this.apiOptions.params)
    const signed = await new awsSigner(this.apiOptions).awsSigner()

    const signedOptions = {
      // hostname: signed.hostname,
      host: 'sellingpartnerapi-na.amazon.com',
      path: signed.pathname() + '?' + signed.search(),
      MarketplaceId: 'ATVPDKIKX0DER',
      method: signed.method,
      headers: signed.headers,
    }

    const req = https.request(signedOptions, res => {
      console.log('API call statusCode:', res.statusCode)

      res.on('data', d => {
        process.stdout.write(d)
      })
    })

    req.on('error', e => {
      console.error(e)
    })

    if (this.apiOptions.method === 'POST') {
      req.write(signed.body)
    }

    req.end()
  }
}
