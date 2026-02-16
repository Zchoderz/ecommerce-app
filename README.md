# E-Commerce Application

A fully-featured, modern e-commerce application built with React and Vite. This is a production-ready e-commerce solution with all the essential features you'd expect from a real online store.

## Features

### Core Shopping Features
- 🛍️ **Product Catalog** - Browse products with category filtering
- 🔍 **Search Functionality** - Real-time product search
- 📱 **Product Detail Pages** - Detailed product views with image galleries, variants, specifications, and reviews
- 🛒 **Shopping Cart** - Add, remove, and update quantities with persistent storage
- 💳 **Checkout Process** - Complete checkout flow with shipping and payment forms
- 🎟️ **Discount Codes** - Apply coupon codes (WELCOME10, SAVE20, SUMMER25)

### User Features
- 👤 **User Authentication** - Login and signup functionality
- ❤️ **Wishlist** - Save favorite products for later
- 📦 **Order History** - View all past orders with status tracking
- 💾 **Data Persistence** - Cart and wishlist saved to localStorage

### Product Features
- 🎨 **Product Variants** - Color and size selection
- ⭐ **Ratings & Reviews** - Customer reviews and star ratings
- 🏷️ **Discount Badges** - Visual indicators for sale items
- 📊 **Product Specifications** - Detailed product information
- 🖼️ **Image Galleries** - Multiple product images with thumbnail navigation

### UI/UX Features
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- 🎨 **Modern Design** - Beautiful, clean interface with smooth animations
- 🔔 **Toast Notifications** - User feedback for all actions
- 🎯 **Intuitive Navigation** - Easy-to-use navigation and search

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ecommerce-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Building for Production

To create a production build:

```bash
npm run build
```

The build files will be in the `dist` directory.

## Project Structure

```
├── src/
│   ├── components/        # React components
│   │   ├── Header.jsx     # Navigation header with search
│   │   ├── ProductList.jsx # Product listing with filters
│   │   ├── ProductCard.jsx # Product card component
│   │   ├── ProductDetail.jsx # Product detail page
│   │   ├── Cart.jsx       # Shopping cart
│   │   ├── Checkout.jsx   # Checkout process
│   │   ├── Login.jsx      # Authentication
│   │   ├── Wishlist.jsx   # Wishlist page
│   │   ├── OrderHistory.jsx # Order history
│   │   ├── SearchBar.jsx  # Search functionality
│   │   └── Toast.jsx      # Toast notifications
│   ├── context/          # State management
│   │   └── AppContext.jsx # Global app state
│   ├── data/             # Sample product data
│   │   └── products.js   # Products and discount codes
│   ├── styles/           # CSS styles
│   │   └── index.css     # All styles
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── public/               # Static assets
├── package.json
└── vite.config.js
```

## Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Context API** - State management
- **LocalStorage** - Data persistence
- **CSS3** - Modern styling with custom properties

## Discount Codes

Try these discount codes at checkout:
- `WELCOME10` - 10% off
- `SAVE20` - 20% off
- `SUMMER25` - 25% off

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

