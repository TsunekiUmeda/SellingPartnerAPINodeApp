import * as https from 'https'
const awsSigner = require('./awsSigner')

export class SellersApi {
  constructor() {}

  call = () => {
    const options = awsSigner()
    const option = {
      hostname: 'sellingpartnerapi-na.amazon.com',
      path: '/sellers/v1/marketplaceParticipations',
      MarketplaceId: 'ATVPDKIKX0DER',
      method: 'GET',
      headers: options.headers,
    }

    const req = https.request(option, res => {
      console.log('statusCode:', res.statusCode)
      console.log('headers:', res.headers)

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
