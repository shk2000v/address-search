import { QueryClient, QueryClientProvider } from "react-query";
import AddressSearchPage from "./components/AddressSearchPage";
import { useState } from "react";

// 데이터 요청 후 3초 이내 재요청 시 캐싱된 데이터로 반환
export const STALE_TIME = 1000 * 3;
export const CACHE_TIME = 1000 * 60 * 5;

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: STALE_TIME,
            cacheTime: CACHE_TIME,
            notifyOnChangeProps: ["data", "dataUpdatedAt"],
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <AddressSearchPage />;
    </QueryClientProvider>
  );
}

export default App;
