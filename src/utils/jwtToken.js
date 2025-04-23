import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; 
const JWT_EXPIRY = '1h'; 

export const generateToken = (userID,role) => {
  
  console.log(`Generating token for userId: ${userID,role}`);
  try {
    return jwt.sign({ id: userID ,role:role}, JWT_SECRET, { expiresIn: JWT_EXPIRY });
  } catch (error) {
    throw new Error('Error generating token');
  }
};


const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'your-secret-key'; 
const JWT_EXPIRYA = '1h'; 

export const generateAdminToken = (adminID,role) => {
  
  console.log(`Generating token for userId: ${adminID,role}`);
  try {
    return jwt.sign({ id: adminID,role:role }, ADMIN_JWT_SECRET, { expiresIn: JWT_EXPIRYA });
  } catch (error) {
    throw new Error('Error generating token');
  }
};


