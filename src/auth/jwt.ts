// const createError = require('http-errors')
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/constants'

export const toJWT = (data: { [key: string]: any }): string =>
	jwt.sign(data, JWT_SECRET, { expiresIn: '2h' })

export const toData = (token: string): string | object =>
	jwt.verify(token, JWT_SECRET)

// module.exports = {
// 	signAccessToken(payload) {
// 		return new Promise((resolve, reject) => {
// 			jwt.sign({ payload }, accessTokenSecret, {}, (err, token) => {
// 				if (err) {
// 					reject(createError.InternalServerError())
// 				}
// 				resolve(token)
// 			})
// 		})
// 	},
// 	verifyAccessToken(token) {
// 		return new Promise((resolve, reject) => {
// 			jwt.verify(token, accessTokenSecret, (err, payload) => {
// 				if (err) {
// 					const message =
// 						err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message
// 					return reject(createError.Unauthorized(message))
// 				}
// 				resolve(payload)
// 			})
// 		})
// 	},
// }
