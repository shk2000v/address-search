import React, { useState, FormEvent, ChangeEvent } from "react";
import { Search } from "lucide-react";
import { useGetKakaoSearchKeywordQuery } from "../api/kakao/KakaoApi.query";

interface AddressResult {
  roadAddress: string;
  jibunAddress: string;
  postalCode: string;
  buildingName?: string;
}
const AddressSearchPage = () => {
  const [searchResult, setSearchResult] = useState<AddressResult | null>(null);
  const [address, setAddress] = useState<string>("");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: kakaoSearchKeywordList, isFetching } =
    useGetKakaoSearchKeywordQuery({
      variables: { query: searchQuery },
      options: {
        enabled: !!searchQuery,
      },
    });

  const handleSearch = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const tempData: AddressResult = {
        roadAddress: "서울특별시 강남구 테헤란로 152",
        jibunAddress: "서울특별시 강남구 역삼동 737",
        postalCode: "06236",
        buildingName: "강남파이낸스센터",
      };
      setSearchResult(tempData);
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setAddress(value);
    setSearchQuery(value);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex">
      <div className="mx-auto w-[780px] p-4">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">주소 검색</h1>
          <p className="text-gray-600">찾으시는 주소를 입력해주세요</p>
        </div>
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
        <React.Suspense fallback={<div>로딩중...</div>}>
          {kakaoSearchKeywordList &&
            kakaoSearchKeywordList?.documents.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 shadow-lg">
                <div className="p-6">
                  <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm text-black">
                      {JSON.stringify(
                        kakaoSearchKeywordList.documents,
                        null,
                        2
                      )}
                    </code>
                  </pre>
                </div>
              </div>
            )}
        </React.Suspense>
        .
      </div>
    </div>
  );
};

export default AddressSearchPage;
