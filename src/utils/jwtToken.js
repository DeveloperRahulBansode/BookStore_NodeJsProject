import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; 
const JWT_EXPIRY = '1h'; 

export const generateToken = (userID) => {
  
  console.log(`Generating token for userId: ${userID}`);
  try {
    return jwt.sign({ id: userID }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
  } catch (error) {
    throw new Error('Error generating token');
  }
};



