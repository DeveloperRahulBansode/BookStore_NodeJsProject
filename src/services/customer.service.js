import { CustomerDetails } from '../models/customer.js';

//add a customer
export const addCustomer = async (customerData) => {
  try {
    // Check if the customer addressType is alredy in datavse so just update address
    
    const existingCustomer = await CustomerDetails.findOne({
      where: {
        userID: customerData.userID,
        addressType: customerData.addressType,
      },
    });
    if (existingCustomer) {
      existingCustomer.fullName = customerData.fullName;
      existingCustomer.mobileNumber = customerData.mobileNumber;
      existingCustomer.address = customerData.address;
      existingCustomer.cityOrTown = customerData.cityOrTown;
      existingCustomer.state = customerData.state;
      await existingCustomer.save();
      return { success: true,message:'Update customer details For same AddressType ', data: existingCustomer };
    }

    // If not, create a new customer    
    const customerExists = await CustomerDetails.findOne({
      where: { userID: customerData.userID },
    });
    if (customerExists) {
      return { success: false, message: 'Customer already exists' };
    }
    const newCustomer = await CustomerDetails.create(customerData);

    return { success: true, data: newCustomer };
  } catch (error) {
    console.error('Error adding customer:', error);
    return { success: false, message: 'Failed to add customer' };
  }
};