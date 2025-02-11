import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie"; // ✅ Correct import

let token = Cookies.get("token"); // ✅ Now it will work
console.log(token);

let decode = token ? jwtDecode(token) : null;

export const getUserDetails = () => decode;
