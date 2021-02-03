import * as https from 'https'
import { awsSigner } from './awsSigner'

export class ProductFeesApi {
  constructor(public SellerSKU: string) {}

  getMyFeesEstimateForSKU = async (): Promise<void> => {
    const data = JSON.stringify({
      FeesEstimateRequest: {
        MarketplaceId: 'ATVPDKIKX0DER',
        PriceToEstimateFees: {
          ListingPrice: {
            CurrencyCode: 'USD',
            Amount: 10,
          },
        },
        Identifier: '100',
      },
    })

    const signed = await new awsSigner(
      'POST',
      `/products/fees/v0/listings/${this.SellerSKU}/feesEstimate`,
      data
    ).awsSigner()

    const option = {
      hostname: signed.hostname,
      path: signed.pathname(),
      method: signed.method,
      headers: signed.headers,
    }

    const req = https.request(option, res => {
      console.log('ProductFees API statusCode:', res.statusCode)

      res.on('data', d => {
        process.stdout.write(d)
      })
    })

    req.on('error', e => {
      console.error(e)
    })

    req.write(data)
    req.end()
  }
}
