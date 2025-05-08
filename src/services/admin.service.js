import { Admin } from '../models/admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateTokens } from '../utils/jwtToken.js';
import { sendResetEmail } from '../helpers/mail.helper.js';

// //get all users
// export const getAllUsers = async () => {
//   try{
//   const data = await User.findAll();
//   if(data===null){
//     return { success: false, message: 'data not found...', };
//   }
//   return {
//     success: true,
//     message: 'Users fetched successfully...',
//     user: data,
//     };

//   }catch (error) {
//     console.error('Error getting user:', error);
//     return { success: false, message: 'Something went wrong. Please try again.' };
//   }
// };

//create new user
export const newAdmin = async (body) => {
  try {
    // Check if the email already exists
    const existingAdmin = await Admin.findOne({ where: { email: body.email } });
    if (existingAdmin) {
      return { success: false, message: 'Email already in use' };
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const adminData = {
      fullName: body.fullName,
      email: body.email,
      password: hashedPassword,
      mobileNumber: body.mobileNumber,
    };
    console.log('Creating admin with data:', adminData);

    const data = await Admin.create(adminData);

    return {
      success: true,
      message: 'admin created successfully...',
      user: data,
    };
  } catch (error) {
    console.error('Error creating admin:', error);
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

// //get single user
// export const getUser = async (id) => {
//   try {
//     const data = await User.findByPk(id);
//     if (!data) {
//       return { success: false, message: 'User not found' };
//     }
//     return {
//       success: true,
//       user: data,
//     };
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     return { success: false, message: 'Something went wrong. Please try again.' };
//   }
// };

//user login
export const adminLogin = async (body) => {
  try {
    // Validate input
    if (!body.email || !body.password) {
      return { success: false, message: 'Email and password are required' };
    }

    // Find user by email
    const data = await Admin.findOne({ where: { email: body.email } });
    if (!data) {
      return { success: false, message: 'User not found' };
    }

    // Check if password exists
    if (!data.password) {
      return { success: false, message: 'Invalid credentials' };
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(body.password, data.password);
    if (!isMatch) {
      return { success: false, message: 'Invalid credentials' };
    }

    // Generate tokens
    let accessToken, refreshToken;
    try {
      ({ accessToken, refreshToken } = generateTokens({
        id: data.adminID,
        role: data.role || 'admin',
      }));
    } catch (tokenError) {
      console.error('Token generation error:', tokenError.message);
      return { success: false, message: 'Failed to generate tokens' };
    }

    // Return success response
    return {
      success: true,
      email: data.email,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.error('Login error:', error.message);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};

//user refresh token
export const adminRefreshToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET_ADMIN);
    const { id } = decoded;

    // Check if the user exists
    const user = await Admin.findByPk(id);
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    const { accessToken } = generateTokens({ id, role: user.role });

    // Send new tokens back
    return {
      success: true,
      accessToken,
    };
  } catch (error) {
    console.error('Refresh token error:', error);
    return { success: false, message: 'Invalid refresh token' };
  }
};



//user forgot password
export const adminForgotPassword = async (email) => {
  try {
    const data = await Admin.findOne({ where: { email: email } });
    if (!data) {
      return { success: false, message: 'User not found' };
    }

    const { accessToken } = generateTokens({ id: data.adminID, role: data.role });
    const result = await sendResetEmail(data.email, `http://localhost:3000/reset-password.html?token=${accessToken}`);

    if (result.success) {
      return {
        success: true,
        message: `Password reset link sent to your email: http://localhost:3000/reset-password.html?token=${accessToken}`,
        email: data.email,
      };
    }
    return { success: false, message: 'Failed to send password reset link.' };
  } catch (error) {
    console.error('Error sending password reset link:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};



export const adminResetPassword = async (token, password, confirmPassword) => {
  try {
    // Check if passwords match
    if (password !== confirmPassword) {
      return { success: false, message: 'Passwords do not match' };
    }

    // Decode the JWT token
    let decoded;
    try {

      decoded = jwt.verify(token, process.env.ACCESS_SECRET_ADMIN);
      console.log('Decoded token:', decoded);
    } catch (error) {
      console.error('Token verification failed:', error);
      return { success: false, message: 'Invalid or expired token' };
    }

    // Find user by ID from the decoded token
    const user = await Admin.findByPk(decoded.id);
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    return { success: true, message: 'Password reset successfully' };
  } catch (error) {
    console.error('Error resetting password:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};
