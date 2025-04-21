import { User } from '../models/user';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwtToken.js';

//get all users
export const getAllUsers = async () => {
  const data = await User.findAll();
  return data;
};

//create new user
export const newUser = async (body) => {
  try {
     // Check if the email already exists
     const existingUser = await User.findOne({ where: { email: body.email } });
     if (existingUser) {
       return { success: false, message: 'Email already in use' };
     }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const userData = {
      fullName: body.fullName,
      email: body.email,
      password: hashedPassword,
      mobileNumber: body.mobileNumber,
    };
    console.log('Creating user with data:', userData);

    const data = await User.create(userData);
    
    return {
      success: true,
      message: 'User created successfully...',
      user: data,
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};


// //update single user
// export const updateUser = async (id, body) => {
//   await User.update(body, {
//     where: { id: id }
//   });
//   return body;
// };

// //delete single user
// export const deleteUser = async (id) => {
//   await User.destroy({ where: { id: id } });
//   return '';
// };

//get single user
export const getUser = async (id) => {
  try {
    const data = await User.findByPk(id);
    if (!data) {
      return { success: false, message: 'User not found' };
    }
    return {
      success: true,
      user: data,
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};

//user login 
export const userLogin = async (body) => {
  try {
    const data = await User.findOne({ where: { email: body.email } });
    
    if (!data) {
      return { success: false, message: 'User not found' };
    }

    const isMatch = await bcrypt.compare(body.password, data.password);
    
    if (!isMatch) {
      return { success: false, message: 'Invalid credentials' };
    }
    return {
      success: true,
      email: data.email,
      token: generateToken(data.userID, data.role)
    };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};



//user forgot password
export const userForgotPassword = async (email) => {
  try {
  const data = await User.findOne({ where: { email: email } });
  if (!data) {
    return { success: false, message: 'User not found' };
  }
  return {
    success: true,
    message: 'Password reset link sent to your email',
    // resetLink: `https://example.com/reset-password?token=${generateToken(data.userID, data.role)}`,
    token: generateToken(data.userID, data.role)
  };
  }
  catch (error) {
    console.error('Error sending password reset link:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};

//user reset password
// export const userResetPassword = async (userID, password, confirmPassword) => {
//   try {
//   const data = await User.findOne({ where: { id: userID } });
//   if (!data) {
//     return { success: false, message: 'User not found' };
//   }
  
//   if (password !== confirmPassword) {
//     return { success: false, message: 'Passwords do not match' };
//   }
 
//     const hashedPassword = await bcrypt.hash(password, 10);
//     await User.update({ password: hashedPassword }, { where: { id: userID } });
    
//     return { success: true, message: 'Password reset successfully' };
//   } catch (error) {
//     console.error('Error resetting password:', error);
//     return { success: false, message: 'Something went wrong. Please try again.' };
//   }
// };
