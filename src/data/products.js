export const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    originalPrice: 129.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500"
    ],
    description: "Premium wireless headphones with active noise cancellation technology. Features 30-hour battery life, quick charge, and premium sound quality.",
    fullDescription: "Experience premium audio with our top-of-the-line wireless headphones. Featuring active noise cancellation that blocks out ambient noise, these headphones deliver crystal-clear sound quality. With 30 hours of battery life and quick charge capability (10 minutes = 3 hours), you'll never run out of power. The comfortable over-ear design and premium materials make these perfect for long listening sessions.",
    category: "Electronics",
    brand: "AudioTech",
    inStock: true,
    stock: 25,
    rating: 4.5,
    reviews: 128,
    variants: {
      color: ["Black", "White", "Blue"],
      defaultColor: "Black"
    },
    specifications: {
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      "Noise Cancellation": "Active",
      "Connectivity": "Bluetooth 5.0"
    },
    reviews: [
      {
        id: 1,
        user: "Sarah M.",
        rating: 5,
        date: "2024-01-15",
        comment: "Amazing sound quality! The noise cancellation works perfectly."
      },
      {
        id: 2,
        user: "Mike T.",
        rating: 4,
        date: "2024-01-10",
        comment: "Great headphones, very comfortable for long use."
      }
    ]
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 249.99,
    originalPrice: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500"
    ],
    description: "Feature-rich smartwatch with comprehensive fitness tracking, heart rate monitoring, and smartphone integration.",
    fullDescription: "Stay connected and healthy with our advanced smartwatch. Track your fitness goals with built-in GPS, heart rate monitoring, and sleep tracking. Receive notifications, make calls, and control your music right from your wrist. Water-resistant design perfect for workouts and daily wear.",
    category: "Electronics",
    brand: "TechWear",
    inStock: true,
    stock: 15,
    rating: 4.7,
    reviews: 89,
    variants: {
      color: ["Black", "Silver", "Rose Gold"],
      size: ["42mm", "46mm"],
      defaultColor: "Black",
      defaultSize: "42mm"
    },
    specifications: {
      "Display": "1.4 inch AMOLED",
      "Battery": "Up to 7 days",
      "Water Resistance": "5 ATM",
      "Sensors": "Heart rate, GPS, Accelerometer"
    },
    reviews: [
      {
        id: 1,
        user: "Emma L.",
        rating: 5,
        date: "2024-01-20",
        comment: "Love the fitness tracking features! Very accurate."
      }
    ]
  },
  {
    id: 3,
    name: "Laptop Backpack",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500"
    ],
    description: "Durable laptop backpack with multiple compartments, padded laptop sleeve, and USB charging port.",
    fullDescription: "Perfect for students and professionals, this backpack features a dedicated padded laptop compartment that fits up to 15.6-inch laptops. Multiple pockets for organization, USB charging port, and water-resistant material make this the ideal travel companion.",
    category: "Accessories",
    brand: "TravelPro",
    inStock: true,
    stock: 40,
    rating: 4.3,
    reviews: 67,
    variants: {
      color: ["Black", "Gray", "Navy Blue"],
      defaultColor: "Black"
    },
    specifications: {
      "Capacity": "30L",
      "Laptop Size": "Up to 15.6 inch",
      "Material": "Water-resistant Polyester",
      "Weight": "1.2 kg"
    },
    reviews: [
      {
        id: 1,
        user: "David K.",
        rating: 4,
        date: "2024-01-18",
        comment: "Great backpack, lots of space and very durable."
      }
    ]
  },
  {
    id: 4,
    name: "Running Shoes",
    price: 129.99,
    originalPrice: 159.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500"
    ],
    description: "Comfortable running shoes with advanced cushioning technology for daily workouts and long-distance running.",
    fullDescription: "Engineered for performance and comfort, these running shoes feature advanced cushioning technology that absorbs impact and provides responsive energy return. Breathable mesh upper keeps your feet cool, while the durable outsole provides excellent traction on various surfaces.",
    category: "Fashion",
    brand: "RunFast",
    inStock: true,
    stock: 30,
    rating: 4.6,
    reviews: 142,
    variants: {
      color: ["Black/White", "Blue/White", "Red/Black"],
      size: ["7", "8", "9", "10", "11", "12"],
      defaultColor: "Black/White",
      defaultSize: "9"
    },
    specifications: {
      "Weight": "280g",
      "Cushioning": "Advanced EVA",
      "Upper": "Breathable Mesh",
      "Suitable For": "Road Running"
    },
    reviews: [
      {
        id: 1,
        user: "Alex P.",
        rating: 5,
        date: "2024-01-22",
        comment: "Best running shoes I've ever owned! Super comfortable."
      },
      {
        id: 2,
        user: "Lisa R.",
        rating: 4,
        date: "2024-01-19",
        comment: "Great shoes, true to size. Good cushioning."
      }
    ]
  },
  {
    id: 5,
    name: "Coffee Maker",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500",
    images: [
      "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=500",
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55c?w=500"
    ],
    description: "Programmable coffee maker with timer, auto-shutoff, and 12-cup capacity. Perfect for home or office.",
    fullDescription: "Start your day right with perfectly brewed coffee. This programmable coffee maker features a 24-hour programmable timer, auto-shutoff, and pause-and-serve function. The 12-cup capacity is perfect for families or small offices.",
    category: "Home",
    brand: "BrewMaster",
    inStock: true,
    stock: 20,
    rating: 4.4,
    reviews: 95,
    variants: {
      color: ["Black", "Stainless Steel"],
      defaultColor: "Black"
    },
    specifications: {
      "Capacity": "12 cups",
      "Programmable": "Yes",
      "Auto Shutoff": "Yes",
      "Warranty": "1 year"
    },
    reviews: [
      {
        id: 1,
        user: "Robert H.",
        rating: 5,
        date: "2024-01-16",
        comment: "Makes great coffee and the timer feature is very convenient."
      }
    ]
  },
  {
    id: 6,
    name: "Bluetooth Speaker",
    price: 59.99,
    originalPrice: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500"
    ],
    description: "Portable Bluetooth speaker with excellent sound quality, waterproof design, and 20-hour battery life.",
    fullDescription: "Take your music anywhere with this portable Bluetooth speaker. IPX7 waterproof rating means it can handle splashes and even brief submersion. With 20 hours of battery life and powerful bass, it's perfect for parties, beach trips, or just listening at home.",
    category: "Electronics",
    brand: "SoundWave",
    inStock: true,
    stock: 35,
    rating: 4.5,
    reviews: 112,
    variants: {
      color: ["Black", "Blue", "Red"],
      defaultColor: "Black"
    },
    specifications: {
      "Battery": "20 hours",
      "Waterproof": "IPX7",
      "Connectivity": "Bluetooth 5.0",
      "Power": "20W"
    },
    reviews: [
      {
        id: 1,
        user: "Jennifer W.",
        rating: 5,
        date: "2024-01-21",
        comment: "Amazing sound quality for the price! Very portable."
      }
    ]
  },
  {
    id: 7,
    name: "Leather Wallet",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
    ],
    description: "Genuine leather wallet with RFID protection, multiple card slots, and cash compartment.",
    fullDescription: "Crafted from genuine leather, this wallet combines style with functionality. RFID blocking technology protects your cards from unauthorized scanning. Multiple card slots and a spacious cash compartment keep everything organized.",
    category: "Accessories",
    brand: "LeatherCraft",
    inStock: true,
    stock: 50,
    rating: 4.2,
    reviews: 78,
    variants: {
      color: ["Brown", "Black"],
      defaultColor: "Brown"
    },
    specifications: {
      "Material": "Genuine Leather",
      "RFID Protection": "Yes",
      "Card Slots": "8",
      "Dimensions": "10.5 x 7.5 cm"
    },
    reviews: [
      {
        id: 1,
        user: "Michael B.",
        rating: 4,
        date: "2024-01-17",
        comment: "Good quality leather, fits all my cards comfortably."
      }
    ]
  },
  {
    id: 8,
    name: "Yoga Mat",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500"
    ],
    description: "Non-slip yoga mat for all types of exercises. Extra thick for comfort and joint protection.",
    fullDescription: "Practice yoga and exercise in comfort with this premium non-slip mat. The extra-thick design provides cushioning for your joints while the textured surface ensures you stay in place during poses. Easy to clean and lightweight for travel.",
    category: "Fitness",
    brand: "FitLife",
    inStock: true,
    stock: 60,
    rating: 4.6,
    reviews: 156,
    variants: {
      color: ["Purple", "Blue", "Pink", "Gray"],
      defaultColor: "Purple"
    },
    specifications: {
      "Thickness": "6mm",
      "Material": "TPE",
      "Dimensions": "183 x 61 cm",
      "Weight": "1.2 kg"
    },
    reviews: [
      {
        id: 1,
        user: "Amanda S.",
        rating: 5,
        date: "2024-01-23",
        comment: "Perfect mat! Great grip and very comfortable."
      },
      {
        id: 2,
        user: "Chris M.",
        rating: 4,
        date: "2024-01-20",
        comment: "Good quality mat, non-slip surface works well."
      }
    ]
  }
];

export const categories = ["All", "Electronics", "Fashion", "Home", "Accessories", "Fitness"];

export const discountCodes = {
  "WELCOME10": 10,
  "SAVE20": 20,
  "SUMMER25": 25
};
