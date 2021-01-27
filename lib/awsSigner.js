const core = require('aws-sdk/lib/core')
const aws = require('aws-sdk')
const { accessKey, secretKey, accessToken } = require('../credentials')

const credential = new aws.Credentials(accessKey, secretKey)

const awsSigner = () => {
  // サービス名は、execiute-api固定。
  const serviceName = 'execute-api'

  // Signers.V4クラスのコンストラクタに渡すオプションを作成します。
  const options = {
    // api gatewayのURL
    url:
      'https://sellingpartnerapi-na.amazon.com/sellers/v1/marketplaceParticipations',
    headers: {
      'Content-Type': 'application/json',
      'x-amz-access-token': accessToken,
    },
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

module.exports = awsSigner
