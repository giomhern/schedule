import jwt from 'jsonwebtoken'

type TokenPayload = {
  userId: number
  email: string
}

export function generateToken(payload: TokenPayload): string {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '24h',
  })
}

export function verifyToken(token: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET) as TokenPayload
  } catch (error) {
    return null
  }
}