import React from "react";
import Routes_heading_texts from "../../components/shared/Routes_heading_texts";

const page = () => {
    return (
        <div>
            <Routes_heading_texts name="Sales" />

            <div className="px-4">
                {/* Short Info */}
                <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4">
                    <p className="text-lg text-gray-600">
                        Demo preview of the Sales Campaign management feature.
                    </p>
                </div>

                {/* Demo Image */}
                <div className="mt-6 flex flex-col items-center">
                    <img
                        src="/saleDemo.png"
                        alt="Sales Campaign Demo"
                        className="w-full max-w-6xl rounded-lg border shadow-sm"
                    />

                    <p className="mt-3 text-sm text-gray-500 text-center">
                        Demo UI shown for presentation purposes only.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default page;
