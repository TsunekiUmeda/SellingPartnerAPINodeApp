const core = require('aws-sdk/lib/core')
const aws = require('aws-sdk')
const { Auth } = require('./Auth')
import { accessKey, secretKey, endpoint, region } from '../credentials'
import { ApiOptions } from './DefaultApiClient'
import * as qs from 'qs'
const credential = new aws.Credentials(accessKey, secretKey)

export class awsSigner {
  constructor(private apiOptions: ApiOptions) {}
  awsSigner = async () => {
    const accessToken = await new Auth().requestAccessToken()
    const queryString = qs.stringify(this.apiOptions.params)
    const body = JSON.stringify(this.apiOptions.data)
    const serviceName = 'execute-api'

    const options = {
      // hostname: 'sellingpartnerapi-na.amazon.com',
      region: region,
      method: this.apiOptions.method,
      search: () => (queryString ? queryString : ''),
      body,
      headers: {
        host: endpoint,
        'x-amz-access-token': accessToken,
      },
      pathname: () => this.apiOptions.pathname,
    }

    if (this.apiOptions.method === 'GET') {
      delete options.body
    }

    const now = new Date()
    // // V4クラスのインスタンスを作成
    const signer = new core.Signers.V4(options, serviceName)
    // // SigV4署名
    signer.addAuthorization(credential, now)
    return options
  }
}
