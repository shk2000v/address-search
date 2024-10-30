// MT1	대형마트
// CS2	편의점
// PS3	어린이집, 유치원
// SC4	학교
// AC5	학원
// PK6	주차장
// OL7	주유소, 충전소
// SW8	지하철역
// BK9	은행
// CT1	문화시설
// AG2	중개업소
// PO3	공공기관
// AT4	관광명소
// AD5	숙박
// FD6	음식점
// CE7	카페
// HP8	병원
// PM9  약국

export type CategoryGroupCodeType =
  | 'MT1'
  | 'CS2'
  | 'PS3'
  | 'SC4'
  | 'AC5'
  | 'PK6'
  | 'OL7'
  | 'SW8'
  | 'BK9'
  | 'CT1'
  | 'AG2'
  | 'PO3'
  | 'AT4'
  | 'AD5'
  | 'FD6'
  | 'CE7'
  | 'HP8'
  | 'PM9';
export type SearchKeywordDocumentsType = {
  address_name: string;
  category_group_code: CategoryGroupCodeType;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
};
export type SearchKeywordMetaType = {
  is_end: boolean;
  pageable_count: number;
  same_name: {
    region: string[];
    keyword: string;
    selected_region: string;
  };
  total_count: number;
};

export type CoordRegioncodeDocumentsType = {
  region_type: string;
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_4depth_name: string;
  code: string;
  x: number;
  y: number;
};
export type CoordRegioncodeMetaType = {
  total_count: number;
};

// 카카오 키워드 검색 parmas
export type GetSearchKeywordParams = {
  query: string;
};
// 카카오 키워드 검색 결과
export type GetSearchKeywordResult = {
  documents: SearchKeywordDocumentsType[];
  meta: SearchKeywordMetaType;
};

export type GetCoordRegioncodeParams = {
  x: number;
  y: number;
};
export type GetCoordRegioncodeResult = {
  documents: CoordRegioncodeDocumentsType[];
  meta: CoordRegioncodeMetaType;
};

// 카카오 주소 검색 parmas
export type GetSearchAddressParams = {
  query: string;
  analyze_type?: 'similar' | 'exact';
  page?: number; // (최소: 1, 최대: 45, 기본값: 1)
  size?: number; // (최소: 1, 최대: 30, 기본값: 10)
};
// 카카오 주소 검색 결과

export type SearchAddressMetaType = {
  totla_count: number;
  pageable_count: number;
  is_end: boolean;
};
export type SearchAddressDocumentType = {
  address_name: string;
  address_type: string;
  x: string;
  y: string;
  address: {
    address_name: string; // 전체 지번 주소
    region_1depth_name: string; // 지역1 Depth, 시도 단위
    region_2depth_name: string; // 지역2 Depth, 구 단위
    region_3depth_name: string; // 지역3 Depth, 동 단위
    region_3depth_h_name: string; // 지역3 Depth, 행정동 단위
    h_code: string; // 행정 코드
    b_code: string; // 법정 코드
    mountain_yn: string; // 산 여부 Y 또는 N
    main_address_no: string; // 지번 주번지
    sub_address_no: string; // 지번 부번지, 없을 경우 빈 문자열("")반환
    x: string; // X 좌표값, 경위도인 경우 Longitude(경도)
    y: string; // Y 좌표값, 경위도인 경우 Latitude(위도)
    // Deprecated
    // zip_code: string;
  };
  road_address: {
    address_name: string; // 전체 도로명 주소
    region_1depth_name: string; // 지역명1
    region_2depth_name: string; // 지역명2
    region_3depth_name: string; // 지역명3
    road_name: string; // 도로명
    underground_yn: string; // 지하여부 (Y/N)
    main_building_no: string; // 건물 본번
    sub_building_no: string; // 건물 부번, 없을 경우 빈 문자열("")반환
    building_name: string; // 건물 이름
    zone_no: string; // 우편번호(5자리)
    x: string; // X 좌표값, 경위도인 경우 Longitude(경도)
    y: string; // Y 좌표값, 경위도인 경우 Latitude(위도)
  };
};
export type GetSearchAddressResult = {
  meta: SearchAddressMetaType;
  documents: SearchAddressDocumentType[];
};
