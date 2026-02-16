import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function ProductCard({ product, addToCart }) {
  const { toggleWishlist, isInWishlist } = useApp()

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.floor(rating) ? 'star filled' : 'star'}>
        ★
      </span>
    ))
  }

  return (
    <div className="product-card">
      <div className="product-image">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        <button
          className={`wishlist-btn-card ${isInWishlist(product.id) ? 'active' : ''}`}
          onClick={() => toggleWishlist(product)}
          title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          ♥
        </button>
        {product.originalPrice && (
          <span className="discount-badge-card">
            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
          </span>
        )}
      </div>
      <div className="product-info">
        <Link to={`/product/${product.id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        {product.rating && (
          <div className="product-rating-card">
            {renderStars(product.rating)}
            <span>({Array.isArray(product.reviews) ? product.reviews.length : 0})</span>
          </div>
        )}
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <div className="price-container">
            <span className="product-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="product-original-price">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            className="add-to-cart-btn"
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

