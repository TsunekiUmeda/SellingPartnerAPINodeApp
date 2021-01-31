import * as https from 'https'
import { awsSigner } from './awsSigner'

export class SellersApi {
  constructor() {}

  call = async (): Promise<void> => {
    const options = await new awsSigner().awsSigner(
      'https://sellingpartnerapi-na.amazon.com/sellers/v1/marketplaceParticipations'
    )
    const option = {
      hostname: 'sellingpartnerapi-na.amazon.com',
      path: '/sellers/v1/marketplaceParticipations',
      MarketplaceId: 'ATVPDKIKX0DER',
      method: 'GET',
      headers: options.headers,
    }

    const req = https.request(option, res => {
      console.log('Sellers API statusCode:', res.statusCode)

      res.on('data', d => {
        process.stdout.write(d)
      })
    })

    req.on('error', e => {
      console.error(e)
    })
    req.end()
  }
}
