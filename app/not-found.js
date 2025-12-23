import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="max-w-xl text-center space-y-6">

                {/* optional brand / illustration */}
                <div className="flex justify-center">
                    <div className="relative w-40 sm:w-52 md:w-64 h-24 sm:h-32 md:h-40">
                        <Image
                            src="/logo.png"
                            alt="Page not found"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                <h1 className="text-4xl -mt-7.5 font-semibold tracking-tight text-gray-900">
                    Page not found
                </h1>

                <p className="text-gray-600">
                    The page you’re looking for doesn’t exist or may have been moved.
                    Let’s get you back to something stylish.
                </p>

                <div className="flex justify-center gap-4 pt-2">
                    <Link
                        href="/"
                        className="px-6 py-2 bg-black text-white rounded-md hover:opacity-90"
                    >
                        Back to Home
                    </Link>

                    <Link
                        href="/shop"
                        className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                    >
                        Shop Collection
                    </Link>
                </div>

                <p className="text-sm text-gray-400">
                    Error code: 404
                </p>
            </div>
        </div>
    );
}
