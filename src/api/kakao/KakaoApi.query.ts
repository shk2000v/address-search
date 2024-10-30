import kakaoApi from "./KakaoApi";
import {
  GetCoordRegioncodeParams,
  GetSearchAddressParams,
  GetSearchKeywordParams,
} from "./KakaoApi.type";
import { useQuery } from "react-query";
import { QUERY_KEY } from "../constants/query-keys";
import { QueryHookParams } from "../type";

export const KAKAO_API_QUERY_KEY = {
  KAKAO_SEARCH_KETWORD: (param?: GetSearchKeywordParams) => [
    QUERY_KEY.KAKAO_SEARCH_KETWORD,
    param,
  ],
  KAKAO_COORD_REGIONCODE: (param?: GetCoordRegioncodeParams) => [
    QUERY_KEY.KAKAO_COORD_REGIONCODE,
    param,
  ],
  KAKAO_ADDRESS_SEARCH: (param?: GetSearchAddressParams) => [
    QUERY_KEY.KAKAO_SEARCH_ADDRESS,
    param,
  ],
};

export function useGetKakaoSearchKeywordQuery(
  params?: QueryHookParams<typeof kakaoApi.getKakaoSearchKeyword>
) {
  const queryKey = KAKAO_API_QUERY_KEY.KAKAO_SEARCH_KETWORD(params?.variables);
  const query = useQuery(
    queryKey,
    () => kakaoApi.getKakaoSearchKeyword(params?.variables),
    params?.options
  );
  return { ...query, queryKey };
}

export function useGetKakaoSearchAddressQuery(
  params?: QueryHookParams<typeof kakaoApi.getKakaoSearchAddress>
) {
  const queryKey = KAKAO_API_QUERY_KEY.KAKAO_ADDRESS_SEARCH(params?.variables);
  const query = useQuery(
    queryKey,
    () => kakaoApi.getKakaoSearchAddress(params?.variables),
    params?.options
  );
  return { ...query, queryKey };
}

export function useGetKakaoCoordRegioncodeQuery(
  params?: QueryHookParams<typeof kakaoApi.getCoordRegioncode>
) {
  const queryKey = KAKAO_API_QUERY_KEY.KAKAO_COORD_REGIONCODE(
    params?.variables
  );
  const query = useQuery(
    queryKey,
    () => kakaoApi.getCoordRegioncode(params?.variables),
    params?.options
  );
  return { ...query, queryKey };
}
