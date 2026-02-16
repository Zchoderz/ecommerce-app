import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Header from './components/Header'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Login from './components/Login'
import Wishlist from './components/Wishlist'
import OrderHistory from './components/OrderHistory'
import Account from './components/Account'
import Toast from './components/Toast'
import ErrorBoundary from './components/ErrorBoundary'
import { useApp } from './context/AppContext'

function AppContent() {
  const { toast } = useApp()

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={
          <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>404 - Page Not Found</h2>
            <p>The page you're looking for doesn't exist.</p>
          </div>
        } />
      </Routes>
      {toast && <Toast toast={toast} />}
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  )
}

export default App

