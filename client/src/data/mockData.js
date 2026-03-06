export const products = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 2000,
    originalPrice: 39.99,
    category: "T-Shirt",
    brand: "DEERIO",
    image:
      "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Premium quality cotton t-shirt with a modern fit. Perfect for everyday wear.",
    stock: 50,
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 2,
    name: "Classic Denim Shirt",
    price: 49.99,
    category: "Shirt",
    brand: "DEERIO",
    image:
      "https://images.pexels.com/photos/2352388/pexels-photo-2352388.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Timeless denim shirt with premium stitching and durable fabric.",
    stock: 35,
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 3,
    name: "Slim Fit Jeans",
    price: 69.99,
    originalPrice: 89.99,
    category: "Jeans",
    brand: "Urban Fit",
    image:
      "https://images.pexels.com/photos/1082526/pexels-photo-1082526.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Modern slim fit jeans with stretch comfort technology.",
    stock: 40,
    sizes: ["28", "30", "32", "34", "36", "38"],
  },
  {
    id: 4,
    name: "Minimalist Hoodie",
    price: 59.99,
    category: "Hoodie",
    brand: "DEERIO",
    image:
      "https://images.pexels.com/photos/8148577/pexels-photo-8148577.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Cozy hoodie with minimalist design and premium fleece interior.",
    stock: 45,
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 5,
    name: "Leather Jacket",
    price: 199.99,
    originalPrice: 249.99,
    category: "Jacket",
    brand: "Premium Co",
    image:
      "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Genuine leather jacket with classic styling and premium finish.",
    stock: 15,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 6,
    name: "Traditional Kurta",
    price: 44.99,
    category: "Kurta",
    brand: "DEERIO",
    image:
      "https://images.pexels.com/photos/3755440/pexels-photo-3755440.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Elegant traditional kurta with modern comfort and style.",
    stock: 30,
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 7,
    name: "Graphic Print T-Shirt",
    price: 34.99,
    category: "T-Shirt",
    brand: "Urban Fit",
    image:
      "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Bold graphic print on premium cotton fabric.",
    stock: 60,
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 8,
    name: "Oxford Shirt",
    price: 54.99,
    originalPrice: 69.99,
    category: "Shirt",
    brand: "Premium Co",
    image:
      "https://images.pexels.com/photos/2352388/pexels-photo-2352388.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Classic oxford shirt perfect for formal and casual wear.",
    stock: 25,
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
];

export const categories = [
  {
    name: "T-Shirt",
    image:
      "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Shirt",
    image:
      "https://images.pexels.com/photos/2352388/pexels-photo-2352388.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Jeans",
    image:
      "https://images.pexels.com/photos/1082526/pexels-photo-1082526.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Hoodie",
    image:
      "https://images.pexels.com/photos/8148577/pexels-photo-8148577.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Jacket",
    image:
      "https://images.pexels.com/photos/1124468/pexels-photo-1124468.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Kurta",
    image:
      "https://images.pexels.com/photos/3755440/pexels-photo-3755440.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "User",
    joinedDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Admin",
    joinedDate: "2024-01-10",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "User",
    joinedDate: "2024-02-01",
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "User",
    joinedDate: "2024-02-15",
  },
];

export const orders = [
  {
    id: "ORD-001",
    user: "John Doe",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    totalPrice: 149.97,
    orderDate: "2024-03-01",
  },
  {
    id: "ORD-002",
    user: "Jane Smith",
    paymentMethod: "PayPal",
    paymentStatus: "Pending",
    totalPrice: 199.99,
    orderDate: "2024-03-02",
  },
  {
    id: "ORD-003",
    user: "Mike Johnson",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    totalPrice: 89.98,
    orderDate: "2024-03-02",
  },
  {
    id: "ORD-004",
    user: "Sarah Williams",
    paymentMethod: "Debit Card",
    paymentStatus: "PartiallyPaid",
    totalPrice: 299.97,
    orderDate: "2024-03-03",
  },
];

export const reviews = [
  {
    id: 1,
    user: "John Doe",
    rating: 5,
    comment: "Excellent quality! Highly recommend.",
    date: "2024-02-20",
  },
  {
    id: 2,
    user: "Jane Smith",
    rating: 4,
    comment: "Great product, fits perfectly.",
    date: "2024-02-18",
  },
  {
    id: 3,
    user: "Mike Johnson",
    rating: 5,
    comment: "Love the material and design!",
    date: "2024-02-15",
  },
];
