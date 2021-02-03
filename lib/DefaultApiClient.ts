import * as https from 'https'
import { awsSigner } from './awsSigner'

export class DefaultApiClient {
  constructor(
    private method: string,
    private pathname: string,
    private data?: {}
  ) {}

  call = async () => {
    const signed = await new awsSigner(
      this.method,
      this.pathname,
      this.data
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

    if (this.method === 'POST') {
      req.write(this.data)
    }

    req.end()
  }
}
