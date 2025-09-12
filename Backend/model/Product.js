import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    sku: {
      type: String,
      unique: true,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    sizes: {
      type: [String],
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    collections: {
      type: String,
      required: true,
    },
    material: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Men", "Women"],
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        altText: {
          type: String,
        },
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    tags: [String],
    user: {
      type: String,
      ref: "users",
      required: true,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    metaKeywords: {
      type: String,
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    weight: Number,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;



//  {
//     "name": "Classic Oxford Button-Down Shirt",
//     "description":
//       "This classic Oxford shirt is tailored for a polished yet casual look. Crafted from high-quality cotton, it features a button-down collar and a comfortable, slightly relaxed fit. Perfect for both formal and casual occasions, it comes with long sleeves, a button placket, and a yoke at the back. The shirt is finished with a gently rounded hem and adjustable button cuffs.",
//     "price": 39.99,
//     "discountPrice": 34.99,
//     "countInStock": 20,
//    "sku": "OX-SH-001",
//     "category": "Top Wear",
//     "brand": "Urban Threads",
//     "sizes": ["S", "M", "L", "XL", "XXL"],
//     "colors": ["Red", "Blue", "Yellow"],
//     "collections": "Business Casual",
//     "material": "Cotton",
//     "gender": "Men",
//     "images": [
//       {
//         "url": "https://picsum.photos/500/500?random=39",
//         "altText": "Classic Oxford Button-Down Shirt Front View",
//       },
//       {
//         "url": "https://picsum.photos/500/500?random=40",
//         "altText": "Classic Oxford Button-Down Shirt Back View",
//       }
//     ],

//     "rating": 4.5,
//     "numReviews": 12
//   }
