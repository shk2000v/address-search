import { AxiosInstance } from "axios";

import kakaoInstance from "../_axios/kakaoInstance";

import {
  GetCoordRegioncodeParams,
  GetCoordRegioncodeResult,
  GetSearchAddressParams,
  GetSearchAddressResult,
  GetSearchKeywordParams,
  GetSearchKeywordResult,
} from "./KakaoApi.type";

export class KakaoApi {
  axios: AxiosInstance = kakaoInstance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  getKakaoSearchKeyword = async (
    params?: GetSearchKeywordParams
  ): Promise<GetSearchKeywordResult> => {
    const { data } = await this.axios({
      method: "GET",
      url: `/v2/local/search/keyword`,
      params,
    });
    return data;
  };

  getKakaoSearchAddress = async (
    params?: GetSearchAddressParams
  ): Promise<GetSearchAddressResult> => {
    const { data } = await this.axios({
      method: "GET",
      url: `/v2/local/search/address.json`,
      params,
    });
    return data;
  };

  getCoordRegioncode = async (
    params?: GetCoordRegioncodeParams
  ): Promise<GetCoordRegioncodeResult> => {
    const { data } = await this.axios({
      method: "GET",
      url: `/v2/local/geo/coord2regioncode`,
      params,
    });
    return data;
  };
}

const kakaoApi = new KakaoApi();

export default kakaoApi;
