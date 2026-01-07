import React from "react";
import Routes_heading_texts from "../../components/shared/Routes_heading_texts";
import { Wrench } from "lucide-react";

const page = () => {
    return (
        <div>
            <Routes_heading_texts name="Sales" />

            <div className="px-4 sm:px-6">
                <div className="mt-8 max-w-3xl mx-auto">
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 sm:p-12">
                        <div className="text-center">
                            {/* Icon */}
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                <Wrench className="w-8 h-8 text-gray-600" />
                            </div>

                            {/* Heading */}
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Under Development
                            </h2>
                            
                            {/* Description */}
                            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                                The Sales Campaign Management feature is currently under development and will be available soon.
                            </p>

                            {/* Planned Features */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <p className="text-sm font-semibold text-gray-700 mb-4">Planned Features:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <h3 className="font-medium text-gray-900 text-sm mb-1">Campaign Manager</h3>
                                        <p className="text-xs text-gray-600">Create and manage sales campaigns</p>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <h3 className="font-medium text-gray-900 text-sm mb-1">Discount Rules</h3>
                                        <p className="text-xs text-gray-600">Set up flexible discount rules</p>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                        <h3 className="font-medium text-gray-900 text-sm mb-1">Performance Analytics</h3>
                                        <p className="text-xs text-gray-600">Track campaign performance</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;