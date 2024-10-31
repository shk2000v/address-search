type props = {
    children: React.ReactNode;
}

const SearchResultBlock = ({ children }: props) => {
    return <div className="bg-white rounded-lg border border-gray-200 shadow-lg">
        <div className="p-6">
            <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm text-black">
                    {children}
                </code>
            </pre>
        </div>
    </div>
}

export default SearchResultBlock