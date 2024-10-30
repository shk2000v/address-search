import axios from "axios";

const kakaoInstance = axios.create({
  baseURL: "https://dapi.kakao.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API_KEY}`,
  },
});

export default kakaoInstance;
