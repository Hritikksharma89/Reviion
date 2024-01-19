import CryptoJS from 'crypto-js'

import { environment } from '@/validation/env.validation'

interface CryptoFactoryInterface {
  comparePassword: (password: string, dPassword: string) => boolean
  decryptedPassword: (password: string) => string
  encryptedPassword: (password: string) => string
}

const SECRET = environment.PASS_SECRET

/**
 * Creates a CryptoJS factory instance to provide encryption,
 * decryption and password comparison utilities using AES
 * and the configured secret key.
 */
const CryptoFactory = (): CryptoFactoryInterface => ({
  comparePassword: (password, dPassword) =>
    CryptoJS.AES.decrypt(dPassword, SECRET).toString(CryptoJS.enc.Utf8) === password,

  decryptedPassword: (password) =>
    CryptoJS.AES.decrypt(password, SECRET).toString(CryptoJS.enc.Utf8),

  encryptedPassword: (password) => CryptoJS.AES.encrypt(password, SECRET).toString(),
})

export default CryptoFactory
