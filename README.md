<div align="center">

<h1>🧾 <b>E-Commerce Product Data Model</b></h1>

<p>🛍️ A clean, flexible and production-ready JSON structure for modern e-commerce platforms.<br>
Works seamlessly with <b>MongoDB</b>, <b>Express</b>, and <b>Next.js</b>.</p>

<hr width="60%">

</div>

<h2>📦 Product JSON Structure</h2>

```jsonc
{
  "id": "",                                   // Unique product identifier
  "name": "Casual Cotton Shirt",              // Product title
  "slug": "casual-cotton-shirt",              // SEO-friendly URL (auto-generated from name)
  "brand": "",                                // Brand name (optional)
  "description": "",                          // Short or detailed description

  "price": 24.99,                             // Original product price

  "sale": {                                   // Sale information
    "active": true,                           // True => sale active
    "price": 19.99,                           // Discounted sale price
    "ends": "2025-12-10T23:59:59Z"            // Sale end date (ISO format)
  },

  "images": [                                 // Product images (gallery)
    "https://via.placeholder.com/600x600.png?text=Shirt+Front",
    "https://via.placeholder.com/600x600.png?text=Shirt+Back"
  ],

  "categories": ["Men", "Clothing"],          // Filtering and navigation categories
  "tags": ["cotton", "casual", "shirt"],      // Search keywords or related tags

  "rating": {                                 // User feedback summary
    "average": 4.5,                           // Average of all reviews
    "count": 58                               // Total number of reviews
  },

  "stock": {                                  // Inventory details
    "inStock": true,                          // Out of stock if false
    "quantity": 35                            // Available quantity
  },

  // 🔸 Product variations (Dynamic)
  // - Only color → keep Color
  // - Only size  → keep Size
  // - Both       → include both
  // - None       → keep empty array []
  "variations": [
    {
      "attribute": "Color",
      "options": ["Blue", "White", "Gray"]
    },
    {
      "attribute": "Size",
      "options": ["S", "M", "L", "XL"]
    }
  ],

  // 🔸 Popularity analytics
  "cartCount": 30,                            // Users who added to cart
  "wishlistCount": 12,                        // Users who wishlisted

  "createdAt": "2025-11-01T09:00:00Z",        // Creation date
  "updatedAt": "2025-11-08T18:00:00Z"         // Last update
}
