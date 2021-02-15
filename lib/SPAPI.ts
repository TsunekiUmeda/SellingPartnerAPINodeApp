const CustomError = require('./CustomError')
const xml_parser = require('fast-xml-parser')
const crypto = require('crypto')
const fs = require('fs')
import axios from 'axios'

export class SPAPI {
  upload = async (details, feed) => {
    this._validateEncryptionDetails(details)
    if (!feed || (!feed.content && !feed.file)) {
      throw new CustomError({
        code: 'NO_FEED_CONTENT_PROVIDED',
        message:
          'Please provide "content" (string) or "file" (absolute path) of feed.',
      })
    }
    if (!feed.contentType) {
      throw new CustomError({
        code: 'NO_FEED_CONTENT_TYPE_PROVIDED',
        message:
          'Please provide "contentType" of feed (should be identical to the contentType used in "createFeedDocument" operation).',
      })
    }
    // let feed_content =
    //   feed.content || (await _readFile(feed.file, feed.contentType))
    let feed_content = feed.content
    // Encrypt content to upload
    let cipher = crypto.createCipheriv(
      'aes-256-cbc',
      Buffer.from(details.encryptionDetails.key, 'base64'),
      Buffer.from(details.encryptionDetails.initializationVector, 'base64')
    )

    let encrypted_buffer = Buffer.concat([
      cipher.update(feed_content),
      cipher.final(),
    ])

    const res = await axios({
      method: 'PUT',
      url: details.url,
      data: encrypted_buffer,
      headers: {
        'Content-Type': feed.contentType,
      },
    })

    this._validateUpOrDownloadSuccess(res, 'UPLOAD')
    return { success: true }
  }

  _validateEncryptionDetails = details => {
    if (!details || !details.encryptionDetails || !details.url) {
      throw new CustomError({
        code: 'DOWNLOAD_INFORMATION_MISSING',
        message: 'Please provide encryptionDetails and url',
      })
    }
    // Docs state that no other encryption standards should be possible, but check if its correct anyway
    if (details.encryptionDetails.standard !== 'AES') {
      throw new CustomError({
        code: 'UNKNOWN_ENCRYPTION_STANDARD',
        message:
          'Cannot decrypt ' +
          details.encryptionDetails.standard +
          ', expecting AES',
      })
    }
    let compression = details.compressionAlgorithm
    // Docs state that no other zip standards should be possible, but check if its correct anyway
    if (compression && compression !== 'GZIP') {
      throw new CustomError({
        code: 'UNKNOWN_ZIP_STANDARD',
        message: 'Cannot unzip ' + compression + ', expecting GZIP',
      })
    }
  }

  _validateUpOrDownloadSuccess = (res, request_type) => {
    if (res.status !== 200) {
      let json_res
      try {
        json_res = xml_parser.parse(res.body)
      } catch (e) {
        throw new CustomError({
          code: request_type + '_ERROR',
          message: res.body,
        })
      }
      if (json_res && json_res.Error) {
        throw new CustomError({
          code: json_res.Error.Code,
          message: json_res.Error.Message,
        })
      } else {
        throw new CustomError({
          code: request_type + '_ERROR',
          message: json_res,
        })
      }
    }

    async function _readFile(file, content_type) {
      console.log('_readFile')
      return new Promise((resolve, reject) => {
        let regexp_charset = /charset=([^;]*)/
        let content_match = content_type.match(regexp_charset)
        let encoding =
          content_match && content_match[1] ? content_match[1] : 'utf-8'
        // fs.readFile doesn't accept ISO-8859-1 as encoding value --> use latin1 as value which is the same
        if (encoding.toUpperCase() === 'ISO-8859-1') {
          encoding = 'latin1'
        }
        fs.readFile(file, encoding, (err, content) => {
          err ? reject(err) : resolve(content)
        })
      })
    }
  }
}
