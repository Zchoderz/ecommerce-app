import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { products } from '../data/products'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, toggleWishlist, isInWishlist } = useApp()
  const product = products.find(p => p.id === parseInt(id))

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product?.variants?.defaultColor || null)
  const [selectedSize, setSelectedSize] = useState(product?.variants?.defaultSize || null)

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="container">
          <div className="not-found">
            <h2>Product not found</h2>
            <button onClick={() => navigate('/')} className="btn-primary">Back to Home</button>
          </div>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    const variant = (selectedColor || selectedSize) ? {
      color: selectedColor,
      size: selectedSize
    } : null
    addToCart(product, variant)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.floor(rating) ? 'star filled' : 'star'}>
        ★
      </span>
    ))
  }

  return (
    <div className="product-detail-container">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
        
        <div className="product-detail">
          <div className="product-detail-images">
            <div className="main-image">
              <img src={product.images?.[selectedImage] || product.image} alt={product.name} />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="thumbnail-images">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className={selectedImage === index ? 'active' : ''}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="product-detail-info">
            <div className="product-header">
              <h1>{product.name}</h1>
              <button
                className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                ♥
              </button>
            </div>

            <div className="product-rating">
              <div className="stars">{renderStars(product.rating)}</div>
              <span className="rating-text">
                {product.rating}{' '}
                ({Array.isArray(product.reviews) ? product.reviews.length : 0} reviews)
              </span>
            </div>

            <div className="product-price-detail">
              <span className="current-price">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="original-price">${product.originalPrice.toFixed(2)}</span>
              )}
              {product.originalPrice && (
                <span className="discount-badge">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            <p className="product-description-full">{product.fullDescription || product.description}</p>

            {product.variants && (
              <div className="product-variants">
                {product.variants.color && (
                  <div className="variant-group">
                    <label>Color: {selectedColor || product.variants.defaultColor}</label>
                    <div className="variant-options">
                      {product.variants.color.map(color => (
                        <button
                          key={color}
                          className={`variant-btn color ${selectedColor === color ? 'active' : ''}`}
                          onClick={() => setSelectedColor(color)}
                          style={{ backgroundColor: color.toLowerCase().includes('black') ? '#000' : 
                                   color.toLowerCase().includes('white') ? '#fff' :
                                   color.toLowerCase().includes('blue') ? '#3b82f6' :
                                   color.toLowerCase().includes('red') ? '#ef4444' :
                                   color.toLowerCase().includes('brown') ? '#8b4513' :
                                   color.toLowerCase().includes('purple') ? '#9333ea' :
                                   color.toLowerCase().includes('pink') ? '#ec4899' :
                                   color.toLowerCase().includes('gray') ? '#6b7280' :
                                   color.toLowerCase().includes('silver') ? '#c0c0c0' :
                                   color.toLowerCase().includes('navy') ? '#1e3a8a' : '#6366f1' }}
                          title={color}
                        >
                          {selectedColor === color && '✓'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.variants.size && (
                  <div className="variant-group">
                    <label>Size: {selectedSize || product.variants.defaultSize}</label>
                    <div className="variant-options">
                      {product.variants.size.map(size => (
                        <button
                          key={size}
                          className={`variant-btn size ${selectedSize === size ? 'active' : ''}`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="product-stock">
              {product.inStock ? (
                <span className="in-stock">✓ In Stock ({product.stock} available)</span>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </div>

            <div className="product-actions">
              <button
                className="btn-primary add-to-cart-detail"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                Add to Cart
              </button>
            </div>

            {product.specifications && (
              <div className="product-specifications">
                <h3>Specifications</h3>
                <table>
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {product.reviews && product.reviews.length > 0 && (
              <div className="product-reviews-section">
                <h3>Customer Reviews</h3>
                {product.reviews.map(review => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <span className="review-user">{review.user}</span>
                      <div className="review-stars">{renderStars(review.rating)}</div>
                      <span className="review-date">{review.date}</span>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

