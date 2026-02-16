import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { discountCodes } from '../data/products'

function Checkout() {
  const { cartItems, getTotalPrice, placeOrder, user } = useApp()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })
  const [discountCode, setDiscountCode] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState(0)
  const [discountError, setDiscountError] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState(null)

  const priceDetails = getTotalPrice(appliedDiscount)

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const orderData = {
      items: cartItems,
      shipping: formData,
      payment: {
        cardNumber: formData.cardNumber.slice(-4),
        expiryDate: formData.expiryDate
      },
      subtotal: priceDetails.subtotal,
      discount: priceDetails.discount,
      total: priceDetails.total
    }
    const id = placeOrder(orderData)
    setOrderId(id)
    setOrderPlaced(true)
  }

  if (orderPlaced) {
    return (
      <div className="checkout-container">
        <div className="container">
          <div className="order-success">
            <h2>✅ Order Placed Successfully!</h2>
            <p>Thank you for your purchase. Your order number is #{orderId}</p>
            <p>You will receive a confirmation email shortly.</p>
            <div className="order-success-actions">
              <Link to="/orders" className="btn-primary">View Orders</Link>
              <Link to="/" className="btn-secondary">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-container">
      <div className="container">
        <h2 className="page-title">Checkout</h2>
        <div className="checkout-content">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Shipping Information</h3>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Discount Code</h3>
              <div className="discount-input-group">
                <input
                  type="text"
                  placeholder="Enter discount code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="discount-input"
                />
                {appliedDiscount > 0 ? (
                  <button
                    type="button"
                    onClick={() => { setDiscountCode(''); setAppliedDiscount(0); setDiscountError('') }}
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

            <div className="form-section">
              <h3>Payment Information</h3>
              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    maxLength="3"
                    required
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn-primary submit-btn">
              Place Order
            </button>
          </form>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="order-items">
              {cartItems.map(item => (
                <div key={item.id} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <div className="order-item-info">
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <span className="order-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="order-total">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout

