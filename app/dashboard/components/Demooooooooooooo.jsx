"use client";
import { useEffect, useState } from "react";
import { Plus, X, ChevronDown, Palette, Ruler } from "lucide-react";

const VARIATION_TYPES = ["Color", "Size"];

const STANDARD_COLORS = [
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Gray", hex: "#9CA3AF" },
    { name: "Navy Blue", hex: "#1E3A8A" },
    { name: "Blue", hex: "#3B82F6" },
    { name: "Red", hex: "#EF4444" },
    { name: "Maroon", hex: "#991B1B" },
    { name: "Green", hex: "#10B981" },
    { name: "Olive", hex: "#84CC16" },
    { name: "Beige", hex: "#FDE68A" },
    { name: "Brown", hex: "#92400E" },
    { name: "Pink", hex: "#EC4899" },
];

const STANDARD_SIZES = [
    "XS", "S", "M", "L", "XL", "XXL",
    "24", "26", "28", "30", "32", "34"
];

export default function ProductVariations({ setProductVaritaions }) {
    const [variations, setVariations] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);

    const usedAttributes = variations.map(v => v.attribute);

    const addVariation = (attribute) => {
        if (!attribute) return;
        setVariations([...variations, { attribute, options: [] }]);
        setOpenDropdown(variations.length);
    };

    const removeVariation = (index) => {
        setVariations(variations.filter((_, i) => i !== index));
        setOpenDropdown(null);
    };

    const toggleOption = (vIndex, value) => {
        const updated = [...variations];
        const opts = updated[vIndex].options;

        if (opts.includes(value)) {
            updated[vIndex].options = opts.filter(o => o !== value);
        } else {
            updated[vIndex].options.push(value);
        }

        if (updated[vIndex].attribute === "Color") {
            const colorOrder = STANDARD_COLORS.map(c => c.name);
            updated[vIndex].options.sort((a, b) => colorOrder.indexOf(a) - colorOrder.indexOf(b));
        } else if (updated[vIndex].attribute === "Size") {
            updated[vIndex].options.sort((a, b) => STANDARD_SIZES.indexOf(a) - STANDARD_SIZES.indexOf(b));
        }

        setVariations(updated);
    };

    useEffect(() => {
        setProductVaritaions?.(variations);
    }, [variations]);

    // const handleSave = () => {
    //     setProductVaritaions?.(variations);
    //     console.log("Backend payload 👉", variations);
    // };

    return (
        <div className="">
            <div className="mx-auto space-y-4 sm:space-y-6">
                {/* Header */}

                <div className="flex justify-between">
                    <div>
                        <h2 className='font-bold col-span-2 text-lg mb-1.5'>Product Variations</h2>
                        <p className="text-xs sm:text-sm text-gray-600">Add color and size variations for your product</p>
                    </div>
                    {/* <div>
                        {variations.length > 0 && (
                            <div className="flex justify-end">
                                <button
                                    onClick={handleSave}
                                    className="w-full sm:w-auto px-8 py-3 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 shadow-sm hover:shadow transition-all cursor-pointer"
                                >
                                    Save Product Variations
                                </button>
                            </div>
                        )}
                    </div> */}
                </div>

                {/* Add Variation Dropdown */}
                <div>
                    <select onChange={(e) => {
                        addVariation(e.target.value);
                        e.target.value = "";
                    }}
                        // disabled={variations.length === VARIATION_TYPES.length}
                        className="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-500 cursor-pointer hover:border-blue-400 focus:outline-none focus:ring focus:ring-blue-800 disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <option value="">+ Add variation type</option>
                        {VARIATION_TYPES.map(type => (
                            <option key={type} value={type} disabled={usedAttributes.includes(type)} className={
                                usedAttributes.includes(type)
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-gray-800 cursor-pointer pl-2"
                            }>
                                {/* {type} */}
                                {usedAttributes.includes(type) ? `${type} (added)` : type}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Variations Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {variations.map((variation, vIndex) => (
                        <div key={variation.attribute} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 sm:p-5 bg-gray-50 border-b border-gray-200">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <div className={`p-2 rounded-lg ${variation.attribute === "Color" ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"}`}>
                                        {variation.attribute === "Color" ? <Palette className="w-4 h-4 sm:w-5 sm:h-5" /> : <Ruler className="w-4 h-4 sm:w-5 sm:h-5" />}
                                    </div>
                                    <div>
                                        <p className="text-sm sm:text-base font-semibold text-gray-900">{variation.attribute}</p>
                                        <p className="text-xs text-gray-500">{variation.options.length} selected</p>
                                    </div>
                                </div>
                                <button onClick={() => removeVariation(vIndex)} className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors cursor-pointer">
                                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </div>

                            <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
                                {/* Selected chips */}
                                {variation.options.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {variation.options.map(opt => {
                                            const colorData = STANDARD_COLORS.find(c => c.name === opt);

                                            return (
                                                <div key={opt} className="group flex items-center gap-2 rounded-lg bg-gray-100 border border-gray-200 px-3 py-1.5 hover:bg-gray-200 transition-colors">
                                                    {variation.attribute === "Color" && (
                                                        <div
                                                            className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                                                            style={{
                                                                backgroundColor: colorData?.hex,
                                                                boxShadow: "0 0 0 1px rgba(0,0,0,0.1)"
                                                            }}
                                                        />
                                                    )}
                                                    <span className="text-xs sm:text-sm font-medium text-gray-700">{opt}</span>
                                                    <button onClick={() => toggleOption(vIndex, opt)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                                                        <X className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Dropdown section */}
                                <div>
                                    <button onClick={() => setOpenDropdown(openDropdown === vIndex ? null : vIndex)} className="w-full flex items-center justify-between rounded-lg border border-gray-300 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all cursor-pointer" >
                                        <span className="flex items-center gap-2">
                                            <Plus className="w-4 h-4" />
                                            Select {variation.attribute}
                                        </span>
                                        <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === vIndex ? "rotate-180" : ""}`} />
                                    </button>

                                    {/* Dropdown content */}
                                    {openDropdown === vIndex && (
                                        <div className="mt-2 max-h-60 overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg">
                                            {(variation.attribute === "Color" ? STANDARD_COLORS : STANDARD_SIZES).map(item => {
                                                const value = variation.attribute === "Color" ? item.name : item;
                                                const active = variation.options.includes(value);

                                                return (
                                                    <div key={value} onClick={() => toggleOption(vIndex, value)}
                                                        className={`flex items-center gap-3 px-4 py-3 text-sm cursor-pointer transition-colors ${active ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
                                                            }`} >
                                                        {variation.attribute === "Color" && (
                                                            <div
                                                                className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                                                                style={{
                                                                    backgroundColor: item.hex,
                                                                    boxShadow: "0 0 0 1px rgba(0,0,0,0.1)"
                                                                }}
                                                            />
                                                        )}
                                                        <span className="flex-1 font-medium">{value}</span>
                                                        {active && (
                                                            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Empty State */}
                    {variations.length === 0 && (
                        <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-8 sm:p-12 text-center col-span-1 lg:col-span-2">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Plus className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No variations added yet</h3>
                            <p className="text-sm text-gray-500">Use the dropdown above to add color or size variations</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}