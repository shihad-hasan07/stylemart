

const ProductPreviewDetails = ({ product }) => {
    if (!product) return null;

    const {
        _id,
        sku,
        name,
        slug,
        brand,
        description,
        price,
        sale,
        images = [],
        categories = [],
        sortDescription,
        tags = [],
        rating = { average: 0, count: 0 }, // 👈 important
        stock = {},
        variations = [],
        cartCount = 0,
        wishlistCount = 0,
    } = product;


    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

            {/* Image */}
            <div>
                <img
                    src={images[0]}
                    alt={name}
                    className="w-full h-[420px] object-cover rounded-lg"
                />

                {/* thumbnails */}
                <div className="flex gap-2 mt-3">
                    {images.slice(0, 4).map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            className="w-16 h-16 object-cover rounded border"
                        />
                    ))}
                </div>
            </div>

            {/* Info */}
            <div>
                <h1 className="text-2xl lg:text-3xl font-semibold">
                    {name || "Product name"}
                </h1>

                {/* fake rating (UI only) */}
                <p className="text-sm text-gray-500 mt-1">
                    ★★★★☆ (preview)
                </p>

                {/* price */}
                <div className="mt-4">
                    {sale?.active ? (
                        <div className="flex gap-2 items-end">
                            <span className="line-through text-gray-400">
                                {price}৳
                            </span>
                            <span className="text-2xl font-semibold text-red-600">
                                {sale.price}৳
                            </span>
                        </div>
                    ) : (
                        <span className="text-2xl font-semibold">
                            {price}৳
                        </span>
                    )}
                </div>

                <p className="text-gray-600 mt-2">
                    {sortDescription}
                </p>

                {/* variations (simple preview) */}
                <div className="mt-4 space-y-3">
                    <div>
                        <p className="text-sm font-medium">Color</p>
                        <div className="flex gap-2 mt-1">
                            {(variations[0]?.options || []).map(c => (
                                <span
                                    key={c}
                                    className="w-6 h-6 rounded-full border"
                                    style={{ background: c }}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-medium">Size</p>
                        <div className="flex gap-2 mt-1">
                            {(variations[1]?.options || []).map(s => (
                                <span
                                    key={s}
                                    className="px-2 py-1 border text-xs"
                                >
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* stock */}
                <p className="mt-5 inline-block text-sm px-3 py-1 bg-red-50 text-red-600">
                    {stock.inStock ? "In stock" : "Out of stock"}
                </p>

                {/* preview actions */}
                <div className="mt-6 flex gap-3">
                    <button className="px-6 py-2 bg-green-600 text-white rounded">
                        Add to cart
                    </button>
                    <button className="px-6 py-2 border rounded">
                        Wishlist
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductPreviewDetails