const core = require('aws-sdk/lib/core')
const aws = require('aws-sdk')
const { Auth } = require('./Auth')
import { accessKey, secretKey } from '../credentials'

const credential = new aws.Credentials(accessKey, secretKey)

export class awsSigner {
  awsSigner = async url => {
    const accessToken = await new Auth().requestAccessToken()

    const serviceName = 'execute-api'
    const options = {
      // api gatewayのURL
      url,
      region: '',
      method: '',
      methodIndex: '',
      search: () => {},
      headers: {
        host: '',
        'x-amz-access-token': accessToken,
      },
      pathname: () => {},
    }

    // api gatewayのURLからホスト、パス、クエリストリングを抽出
    const parts = options.url.split('?')
    const host = parts[0].substr(8, parts[0].indexOf('/', 8) - 8)
    const path = parts[0].substr(parts[0].indexOf('/', 8))
    const querystring = parts[1]

    // V4クラスのコンストラクタの引数に沿う形でoptionsを作成
    const now = new Date()
    options.headers.host = host
    options.pathname = () => path
    options.methodIndex = 'post'
    options.search = () => (querystring ? querystring : '')
    options.region = 'us-east-1'
    options.method = 'GET'

    // V4クラスのインスタンスを作成
    const signer = new core.Signers.V4(options, serviceName)

    // SigV4署名
    signer.addAuthorization(credential, now)
    return options
  }
}
