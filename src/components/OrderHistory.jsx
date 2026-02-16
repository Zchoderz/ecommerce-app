import { useApp } from '../context/AppContext'
import { Link } from 'react-router-dom'

function OrderHistory() {
  const { orders, user } = useApp()

  if (!user) {
    return (
      <div className="order-history-container">
        <div className="container">
          <div className="auth-required">
            <h2>Please login to view your orders</h2>
            <Link to="/login" className="btn-primary">Login</Link>
          </div>
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="order-history-container">
        <div className="container">
          <h2 className="page-title">Order History</h2>
          <div className="no-orders">
            <p>You haven't placed any orders yet.</p>
            <Link to="/" className="btn-primary">Start Shopping</Link>
          </div>
        </div>
      </div>
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing': return 'status-processing'
      case 'shipped': return 'status-shipped'
      case 'delivered': return 'status-delivered'
      case 'cancelled': return 'status-cancelled'
      default: return ''
    }
  }

  return (
    <div className="order-history-container">
      <div className="container">
        <h2 className="page-title">Order History</h2>
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <h3>Order #{order.id}</h3>
                  <p className="order-date">
                    {new Date(order.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <span className={`order-status ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              
              <div className="order-items-preview">
                {order.items?.slice(0, 3).map((item, index) => (
                  <div key={index} className="order-item-preview">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p>{item.name}</p>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  </div>
                ))}
                {order.items?.length > 3 && (
                  <p className="more-items">+{order.items.length - 3} more items</p>
                )}
              </div>

              <div className="order-footer">
                <div className="order-total-info">
                  <span>Total: <strong>${order.total?.toFixed(2)}</strong></span>
                </div>
                <button className="btn-secondary">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderHistory

