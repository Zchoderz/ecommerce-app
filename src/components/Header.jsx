import { Link } from 'react-router-dom'

function Header({ cartItemCount }) {
  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <h1>🛍️ E-Commerce Store</h1>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/cart" className="nav-link cart-link">
            Cart
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header

