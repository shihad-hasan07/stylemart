// Skeleton Loader
const SkeletonLoader = () => (
    <div className="space-y-4">
        {[1].map((i) => (
            <div key={i} className="border border-gray-200 animate-pulse">
                <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
                    <div className="flex gap-6">
                        <div className="h-4 w-32 bg-gray-200"></div>
                        <div className="h-4 w-24 bg-gray-200"></div>
                        <div className="h-4 w-20 bg-gray-200"></div>
                    </div>
                    <div className="flex gap-3">
                        <div className="h-6 w-24 bg-gray-200"></div>
                        <div className="h-6 w-20 bg-gray-200"></div>
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gray-200"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 w-48 bg-gray-200"></div>
                            <div className="h-3 w-32 bg-gray-200"></div>
                            <div className="h-4 w-24 bg-gray-200"></div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default SkeletonLoader