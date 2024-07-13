
import axios from 'axios';

export const postUserLogin = async (email, password) => {
  try {
    const response = await axios.post('https://api.fesp.shop/users/login', { email, password });
    console.log(response)
    return response;
  } catch (error) {
    return error.response;
  }
};
