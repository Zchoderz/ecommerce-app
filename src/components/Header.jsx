import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import SearchBar from './SearchBar'

function Header() {
  const { cartItems, wishlist, user, logout, getCartItemCount } = useApp()
  const [showSearch, setShowSearch] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <>
      <header className="header">
        <div className="container">
          <Link to="/" className="logo" onClick={() => setShowSearch(false)}>
            <h1>🛍️ E-Commerce Store</h1>
          </Link>
          <nav className="nav">
            <button
              className="nav-link search-btn"
              onClick={() => setShowSearch(!showSearch)}
              title="Search"
            >
              🔍
            </button>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/wishlist" className="nav-link wishlist-link">
              Wishlist
              {wishlist.length > 0 && (
                <span className="cart-badge">{wishlist.length}</span>
              )}
            </Link>
            <Link to="/cart" className="nav-link cart-link">
              Cart
              {getCartItemCount() > 0 && (
                <span className="cart-badge">{getCartItemCount()}</span>
              )}
            </Link>
            {user ? (
              <div className="user-menu-container">
                <button
                  className="user-menu-btn"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <img src={user.avatar} alt={user.name} className="user-avatar" />
                  <span>{user.name}</span>
                </button>
                {showUserMenu && (
                  <div className="user-menu">
                    <Link to="/orders" onClick={() => setShowUserMenu(false)}>My Orders</Link>
                    <button onClick={() => { logout(); setShowUserMenu(false) }}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="nav-link">Login</Link>
            )}
          </nav>
        </div>
      </header>
      {showSearch && (
        <div className="search-overlay">
          <SearchBar onClose={() => setShowSearch(false)} />
        </div>
      )}
    </>
  )
}

export default Header

