import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/constants'

export const toJWT = (data: { [key: string]: any }): string =>
  jwt.sign(data, JWT_SECRET, { expiresIn: '2h' })

export const toData = (token: string): string | object =>
  jwt.verify(token, JWT_SECRET)
