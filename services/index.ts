import axios from 'axios';
import cookie from "js-cookie"

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Create an instance of Axios with a base URL
const instance = axios.create({
  baseURL: `${apiUrl}`, // Replace with your base URL
  headers: {Authorization:cookie.get("token")}
}); 



export default instance