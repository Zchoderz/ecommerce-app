import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { discountCodes } from '../data/products'

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useApp()
  const [discountCode, setDiscountCode] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState(0)
  const [discountError, setDiscountError] = useState('')

  const handleApplyDiscount = () => {
    const code = discountCode.toUpperCase()
    if (discountCodes[code]) {
      setAppliedDiscount(discountCodes[code])
      setDiscountError('')
    } else {
      setDiscountError('Invalid discount code')
      setAppliedDiscount(0)
    }
  }

  const handleRemoveDiscount = () => {
    setDiscountCode('')
    setAppliedDiscount(0)
    setDiscountError('')
  }

  const priceDetails = getTotalPrice(appliedDiscount)
  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="container">
          <h2 className="page-title">Shopping Cart</h2>
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <Link to="/" className="btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    )
  }

  const handleRemoveFromCart = (item) => {
    removeFromCart(item.id, item.variant)
  }

  const handleUpdateQuantity = (item, newQuantity) => {
    updateQuantity(item.id, newQuantity, item.variant)
  }

  return (
    <div className="cart-container">
      <div className="container">
        <h2 className="page-title">Shopping Cart</h2>
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={`${item.id}-${index}`} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  {item.variant && (
                    <p className="cart-item-variant">
                      {item.variant.color && `Color: ${item.variant.color}`}
                      {item.variant.color && item.variant.size && ' • '}
                      {item.variant.size && `Size: ${item.variant.size}`}
                    </p>
                  )}
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                </div>
                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button
                      onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      −
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
                <div className="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="discount-section">
              <div className="discount-input-group">
                <input
                  type="text"
                  placeholder="Discount code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="discount-input"
                />
                {appliedDiscount > 0 ? (
                  <button
                    type="button"
                    onClick={handleRemoveDiscount}
                    className="discount-remove-btn"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleApplyDiscount}
                    className="discount-apply-btn"
                  >
                    Apply
                  </button>
                )}
              </div>
              {discountError && <p className="discount-error">{discountError}</p>}
              {appliedDiscount > 0 && (
                <p className="discount-applied">
                  {appliedDiscount}% discount applied!
                </p>
              )}
            </div>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${priceDetails.subtotal.toFixed(2)}</span>
            </div>
            {appliedDiscount > 0 && (
              <div className="summary-row discount-row">
                <span>Discount ({appliedDiscount}%):</span>
                <span>-${priceDetails.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${priceDetails.total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="btn-primary checkout-btn">
              Proceed to Checkout
            </Link>
            <Link to="/" className="btn-secondary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

