const core = require('aws-sdk/lib/core')
const aws = require('aws-sdk')
const { Auth } = require('./Auth')
import { accessKey, secretKey } from '../credentials'
const credential = new aws.Credentials(accessKey, secretKey)

export class awsSigner {
  constructor(
    private method: string,
    private pathname: string,
    private body?: {}
  ) {}
  awsSigner = async () => {
    const accessToken = await new Auth().requestAccessToken()
    console.log('body', this.body)
    const serviceName = 'execute-api'
    const options = {
      hostname: 'sellingpartnerapi-na.amazon.com',
      region: 'us-east-1',
      method: this.method,
      search: () => '',
      body: this.body,
      headers: {
        host: 'sellingpartnerapi-na.amazon.com',
        'x-amz-access-token': accessToken,
      },
      pathname: () => this.pathname,
    }

    if (this.method === 'GET') {
      delete options.body
    }

    const now = new Date()
    // // V4クラスのインスタンスを作成
    const signer = new core.Signers.V4(options, serviceName)

    // // SigV4署名
    signer.addAuthorization(credential, now)
    console.log('header', options.headers)
    return options
  }
}
