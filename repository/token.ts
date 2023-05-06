import jwt from 'jsonwebtoken';

const tokenRepo = {
  getEncryptedJwt(data: Record<string, any>) {
    return jwt.sign(data, process.env.JWT_SECRET || '', {
      algorithm: 'HS256',
      expiresIn: '30d'
    })
  }
}

export default tokenRepo;