/**
 * Значения переменных VERIFICATION_CODE и ACCESS_TOKEN_SECRET
 * в продакшне должны быть случайными строками.
 * Эти переменные являются общими для сервера и клиента.
 * При использовании на клиенте они должны оставаться скрытыми
 * (REACT_APP_VERIFICATION_CODE, например).
 * Значения этих переменных должны периодически обновляться.
 *
 * с целью уменьшения количества запросов к серверу следует
 * предусмотреть возможность временного хранения токенов на стороне клиента
 * (в шаблоне это реализовано с помощью куки — для токена обновления,
 * для токена доступа на клиенте следует использовать sessionStorage
 * (но не localStorage) или просто хранить токен в памяти).
 */

import { generateToken } from '../utils/token.js'

export const VERIFICATION_CODE = generateToken()
export const COOKIE_NAME = 'qid'
export const ACCESS_TOKEN_SECRET = generateToken()
export const ALLOWED_ORIGIN = 'http://localhost:3000'
