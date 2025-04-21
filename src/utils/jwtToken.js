import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; 
const JWT_EXPIRY = '1h'; 

export const generateToken = (userId,role) => {
  const payload = {
    user: {
      id: userId,
      role: role,
    },
  };


  console.log(`Generating token for userId: ${userId} with role: ${role}`);
  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
  } catch (error) {
    throw new Error('Error generating token');
  }
};
