//  для подписания и проверки токенов

import jwt from 'jsonwebtoken'
import crypto from 'crypto'

export function generateToken() {
  return crypto.randomBytes(32).toString('hex')
}

export const signToken = async (payload, secret, options) =>
  await jwt.sign(payload, secret, options)

export const verifyToken = async (token, secret) =>
  await jwt.verify(token, secret)
