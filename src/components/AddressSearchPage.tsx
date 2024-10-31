import React, { useState, FormEvent, ChangeEvent } from "react";
import { Search } from "lucide-react";
import { useGetKakaoSearchAddressQuery, useGetKakaoSearchKeywordQuery } from "../api/kakao/KakaoApi.query";
import DaumPostcodeEmbed from 'react-daum-postcode';
import { Address } from "react-daum-postcode/lib/loadPostcode";
import SearchResultBlock from "./SearchResultBlock";
import { SearchAddressDocumentType, SearchKeywordDocumentsType } from "../api/kakao/KakaoApi.type";

type SearchModeType = "keyword" | "address" | "both" | "postcode";

const MODE_EXPLAIN: Record<SearchModeType, string> = {
  keyword: "키워드 검색",
  address: "주소 검색",
  both: "키워드 + 주소 검색",
  postcode: "우편번호 검색"
};

const AddressSearchPage = () => {
  const [address, setAddress] = useState<string>("");
  const [searchMode, setSearchMode] = useState<SearchModeType>("keyword");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPostCodeAddress, setSelectedPostCodeAddress] = useState('');
  const { data: kakaoSearchKeywordList } = useGetKakaoSearchKeywordQuery({
    variables: { query: searchQuery },
    options: {
      enabled: searchQuery.length > 0 && searchMode === "both" || searchMode === "keyword",
    },
  });

  const { data: kakaoSearchAddressList } = useGetKakaoSearchAddressQuery({
    variables: { query: searchQuery },
    options: {
      enabled: searchQuery.length > 0 && searchMode === "both" || searchMode === "address",
    },
  });

  const { data: postCodeSearchAddress } = useGetKakaoSearchAddressQuery({
    variables: { query: selectedPostCodeAddress },
    options: {
      enabled: selectedPostCodeAddress.length > 0 && searchMode === "postcode",
    },
  });

  const handleSearch = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      //   const tempData: AddressResult = {
      //     roadAddress: "서울특별시 강남구 테헤란로 152",
      //     jibunAddress: "서울특별시 강남구 역삼동 737",
      //     postalCode: "06236",
      //     buildingName: "강남파이낸스센터",
      //   };
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setAddress(value);
    setSearchQuery(value);
  };

  // console.log('[selectedPostCodeAddress] : ', selectedPostCodeAddress);


  const handleComplete = (data: Address) => {
    setSelectedPostCodeAddress(data.address)
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex">
      <div className="mx-auto w-full max-w-[780px] p-4 justify-center item-center">
        <div className="mb-8 text-center justify-center item-center ">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">주소 검색</h1>
          <p className="text-gray-600">찾으시는 주소를 입력해주세요</p>
          <p className="text-black my-4">
            현재 검색 모드 : {MODE_EXPLAIN[searchMode]}
          </p>
        </div>
        <div className="mb-8 text-center">
          {Array.from(Object.keys(MODE_EXPLAIN)).map((mode) => {
            return (
              <input
                type="button"
                key={mode}
                className="mr-3 cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-lg px-4 py-2 hover:bg-gray-300"
                aria-label={MODE_EXPLAIN[mode as SearchModeType]}
                onClick={() => setSearchMode(mode as SearchModeType)}
                value={MODE_EXPLAIN[mode as SearchModeType]}
              />
            );
          })}

        </div>
        {searchMode !== "postcode" &&
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="주소를 입력하세요"
                className="w-full px-4 py-3 pr-12 text-lg rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={address}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="주소 검색"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
        }
        <div>
          {searchMode === "keyword" && (
            <React.Suspense fallback={<div>로딩중...</div>}>
              {kakaoSearchKeywordList &&
                kakaoSearchKeywordList?.documents.length > 0 && (
                  <SearchResultBlock>
                    <KeywordSearchResult keywords={kakaoSearchKeywordList.documents} />
                  </SearchResultBlock>
                )}
            </React.Suspense>
          )}

          {searchMode === "address" && (
            <React.Suspense fallback={<div>로딩중...</div>}>
              {kakaoSearchAddressList &&
                kakaoSearchAddressList?.documents.length > 0 && (
                  <SearchResultBlock>
                    <AddressSearchResult address={kakaoSearchAddressList.documents} />
                  </SearchResultBlock>
                )}
            </React.Suspense>
          )}
          {searchMode === "both" && (
            <React.Suspense fallback={<div>로딩중...</div>}>
              <div className="flex flex-row gap-x-5">
                {kakaoSearchKeywordList &&
                  kakaoSearchKeywordList?.documents.length > 0 && (
                    <SearchResultBlock>
                      <h3 className="">키워드 검색 결과</h3>
                      <KeywordSearchResult keywords={kakaoSearchKeywordList.documents} />
                    </SearchResultBlock>
                  )}
                {kakaoSearchAddressList &&
                  kakaoSearchAddressList?.documents.length > 0 && (
                    <SearchResultBlock>
                      <h2>주소 검색 결과</h2>
                      <AddressSearchResult address={kakaoSearchAddressList.documents} />
                    </SearchResultBlock>
                  )}
              </div>
            </React.Suspense>
          )}
          {searchMode === "postcode" &&
            <React.Suspense fallback={<div>로딩중...</div>}>
              <DaumPostcodeEmbed autoClose={false} onComplete={handleComplete} />

              {postCodeSearchAddress && postCodeSearchAddress.documents.map((item, index) => {
                return <div key={index} className="mt-3 flex ">
                  <code>
                    <div>이름 : {item.address_name}</div>
                    <div>{`위도(y) : ${item.y}`}</div>
                    <div>{`경도(x) : ${item.x}`}</div>
                  </code>
                </div>
              })}
            </React.Suspense>
          }
        </div>
      </div>
    </div>
  );
};

export default AddressSearchPage;


type SearchResultType = {
  keywords: Array<SearchKeywordDocumentsType>;
  address: Array<SearchAddressDocumentType>;
}
const KeywordSearchResult = ({ keywords }: Pick<SearchResultType, 'keywords'>) => (
  keywords.map((item, index) => {
    return <div key={`${index}`} className="mb-4">
      <div>{index + 1}.</div>
      <div>주소 이름 : {item.address_name}</div>
      <div>도로명 이름 : {item.road_address_name}</div>
      <div>{`위도(y) : ${item.y}`}</div>
      <div>{`경도(x) : ${item.x}`}</div>
    </div>
  }));

const AddressSearchResult = ({ address }: Pick<SearchResultType, 'address'>) => (
  address.map((item, index) => {
    return <div key={`${index}`} className="mb-4">
      <div>{index + 1}.</div>
      <div>주소 이름 : {item.address_name}</div>
      <div>{`위도(y) : ${item.y}`}</div>
      <div>{`경도(x) : ${item.x}`}</div>
    </div>
  }));
