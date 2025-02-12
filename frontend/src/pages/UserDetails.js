import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

let token = Cookies.get("token");
console.log(token);

let decode = token ? jwtDecode(token) : null;

export const getUserDetails = () => decode;
