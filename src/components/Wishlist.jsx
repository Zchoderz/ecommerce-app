import { useApp } from '../context/AppContext'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'

function Wishlist() {
  const { wishlist, addToCart, toggleWishlist } = useApp()

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-container">
        <div className="container">
          <h2 className="page-title">My Wishlist</h2>
          <div className="empty-wishlist">
            <p>Your wishlist is empty.</p>
            <Link to="/" className="btn-primary">Start Shopping</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="wishlist-container">
      <div className="container">
        <h2 className="page-title">My Wishlist ({wishlist.length})</h2>
        <div className="products-grid">
          {wishlist.map(product => (
            <div key={product.id} className="product-card-wrapper">
              <button
                className="wishlist-remove-btn"
                onClick={() => toggleWishlist(product)}
                title="Remove from wishlist"
              >
                ×
              </button>
              <ProductCard product={product} addToCart={addToCart} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wishlist

