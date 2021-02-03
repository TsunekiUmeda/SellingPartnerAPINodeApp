import * as https from 'https'
import { awsSigner } from './awsSigner'

export class SellersApi {
  constructor() {}

  call = async (): Promise<void> => {
    const signed = await new awsSigner(
      'GET',
      '/sellers/v1/marketplaceParticipations'
    ).awsSigner()

    const option = {
      hostname: signed.hostname,
      path: signed.pathname(),
      MarketplaceId: 'ATVPDKIKX0DER',
      method: signed.method,
      headers: signed.headers,
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
