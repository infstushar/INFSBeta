import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL =
  "http://ec2-15-207-115-51.ap-south-1.compute.amazonaws.com:8000";

let authTokens = AsyncStorage.getItem("userToken")
  ? AsyncStorage.getItem("userToken")
  : null;

const AxiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${authTokens}`,
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.request.use(async (req) => {
  let authTokens = await AsyncStorage.getItem("userToken");

  if (authTokens) {
    // authTokens = AsyncStorage.getItem("userToken")
    //   ? AsyncStorage.getItem("userToken")
    //   : null;
    req.headers.Authorization = `Bearer ${authTokens}`;
  } else {
    console.log("No token available");
  }

  console.log("authTokens - " + JSON.stringify(req));

  const user = jwt_decode(JSON.stringify(authTokens));

  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (isExpired) {
    console.log("Token is expired and intited call for refresh");
    let refreshTokens = await AsyncStorage.getItem("refreshToken");
    const response = await axios.post(`${baseURL}/api/token/refresh/`, {
      refresh: refreshTokens,
    });

    console.log("response refresh", JSON.stringify(response));

    AsyncStorage.setItem("userToken", response.data.access);
    req.headers.Authorization = `Bearer ${response.data.access}`;
  } else {
    console.log("Token is not expired ");
  }
  return req;
});

export default AxiosInstance;
