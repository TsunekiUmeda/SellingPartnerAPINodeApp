import * as qs from 'qs'
import fetch from 'node-fetch'
import * as https from 'https'
import * as fs from 'fs'
// import axios from 'axios'
import { refresh_token, client_id, client_secret } from '../credentials'
const credential = JSON.parse(fs.readFileSync('./token.json', 'utf8'))
export class Auth {
  ValidateAccessToken = () => {
    return new Promise(function (resolve, reject) {
      var req = https.get(
        `https://api.amazon.com/auth/O2/tokeninfo?access_token=${credential.accessToken}`,
        function (res) {
          // reject on bad status
          // if (res.statusCode < 200 || res.statusCode >= 300) {
          //   return reject(new Error('statusCode=' + res.statusCode))
          // }
          // cumulate data
          var body = []
          res.on('data', function (chunk) {
            body.push(chunk)
          })
          // resolve on end
          res.on('end', function () {
            try {
              body = JSON.parse(Buffer.concat(body).toString())
            } catch (e) {
              reject(e)
            }

            if (body['exp']) {
              console.log(
                'The remaining lifetime of the access token',
                body['exp']
              )
            } else {
              console.log('Refresh access token')
            }
            resolve(res.statusCode)
          })
        }
      )
      // reject on request error
      req.on('error', function (err) {
        // This is not a "Second reject", just a different sort of failure
        reject(err)
      })
      // if (postData) {
      //   req.write(postData)
      // }
      // IMPORTANT
      req.end()
    })
  }

  requestAccessToken = async () => {
    await this.ValidateAccessToken()
      .then(statusCode => {
        if (statusCode === 200) {
          return credential.accessToken
        }
      })
      .catch(e => {
        console.log('Error', e)
      })

    const body = {
      grant_type: 'refresh_token',
      client_id,
      refresh_token,
      client_secret,
    }
    console.log('renew')
    const accessToken = await fetch('https://api.amazon.com/auth/o2/token', {
      method: 'POST',
      body: qs.stringify(body),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })

    if (accessToken.ok) {
      console.log('Auth statusCode:', accessToken.statusText)
      const accessToken_json = await accessToken.json()
      const data = { accessToken: accessToken_json['access_token'] }
      fs.writeFileSync('./token.json', JSON.stringify(data))

      return accessToken_json['access_token']
    } else {
      throw new Error(accessToken.statusText)
    }
  }
}
