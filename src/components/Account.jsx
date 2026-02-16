import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { Link, useNavigate } from 'react-router-dom'

function Account() {
  const { user, addresses, paymentMethods, updateProfile, changePassword, addAddress, updateAddress, deleteAddress, setDefaultAddress, addPaymentMethod, deletePaymentMethod, setDefaultPaymentMethod } = useApp()
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [showAddAddress, setShowAddAddress] = useState(false)
  const [showAddPayment, setShowAddPayment] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)
  const [editingPayment, setEditingPayment] = useState(null)
  const navigate = useNavigate()

  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: ''
  })

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      })
    }
  }, [user])

  const [addressForm, setAddressForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'United States',
    isDefault: false
  })

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    isDefault: false
  })

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  if (!user) {
    return (
      <div className="account-container">
        <div className="container">
          <div className="auth-required">
            <h2>Please login to access your account</h2>
            <Link to="/login" className="btn-primary">Login</Link>
          </div>
        </div>
      </div>
    )
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault()
    updateProfile(profileForm)
    setIsEditing(false)
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    changePassword(passwordForm.oldPassword, passwordForm.newPassword)
    setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' })
  }

  const handleAddAddress = (e) => {
    e.preventDefault()
    addAddress(addressForm)
    setAddressForm({
      name: '',
      phone: '',
      address: '',
      city: '',
      zipCode: '',
      country: 'United States',
      isDefault: false
    })
    setShowAddAddress(false)
  }

  const handleUpdateAddress = (e) => {
    e.preventDefault()
    updateAddress(editingAddress.id, addressForm)
    setEditingAddress(null)
    setAddressForm({
      name: '',
      phone: '',
      address: '',
      city: '',
      zipCode: '',
      country: 'United States',
      isDefault: false
    })
  }

  const handleEditAddress = (address) => {
    setEditingAddress(address)
    setAddressForm(address)
    setShowAddAddress(true)
  }

  const handleAddPayment = (e) => {
    e.preventDefault()
    addPaymentMethod(paymentForm)
    setPaymentForm({
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
      isDefault: false
    })
    setShowAddPayment(false)
  }

  const handleDeleteAddress = (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      deleteAddress(addressId)
    }
  }

  const handleDeletePayment = (paymentId) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      deletePaymentMethod(paymentId)
    }
  }

  return (
    <div className="account-container">
      <div className="container">
        <h2 className="page-title">My Account</h2>
        
        <div className="account-layout">
          <div className="account-sidebar">
            <div className="account-user-info">
              <img src={user.avatar} alt={user.name} className="account-avatar" />
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
            <nav className="account-nav">
              <button
                className={activeTab === 'profile' ? 'active' : ''}
                onClick={() => setActiveTab('profile')}
              >
                Profile Information
              </button>
              <button
                className={activeTab === 'addresses' ? 'active' : ''}
                onClick={() => setActiveTab('addresses')}
              >
                Address Book ({addresses.length})
              </button>
              <button
                className={activeTab === 'payments' ? 'active' : ''}
                onClick={() => setActiveTab('payments')}
              >
                Payment Methods ({paymentMethods.length})
              </button>
              <button
                className={activeTab === 'password' ? 'active' : ''}
                onClick={() => setActiveTab('password')}
              >
                Change Password
              </button>
            </nav>
          </div>

          <div className="account-content">
            {activeTab === 'profile' && (
              <div className="account-section">
                <div className="section-header">
                  <h3>Profile Information</h3>
                  {!isEditing && (
                    <button className="btn-secondary" onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </button>
                  )}
                </div>
                {isEditing ? (
                  <form onSubmit={handleProfileUpdate} className="account-form">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="btn-primary">Save Changes</button>
                      <button type="button" className="btn-secondary" onClick={() => {
                        setIsEditing(false)
                        setProfileForm({ name: user.name, email: user.email, phone: user.phone || '' })
                      }}>
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="profile-info">
                    <div className="info-row">
                      <span className="info-label">Full Name:</span>
                      <span className="info-value">{user.name}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Email:</span>
                      <span className="info-value">{user.email}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Phone:</span>
                      <span className="info-value">{user.phone || 'Not provided'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Member Since:</span>
                      <span className="info-value">
                        {user.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="account-section">
                <div className="section-header">
                  <h3>Address Book</h3>
                  <button className="btn-primary" onClick={() => {
                    setShowAddAddress(true)
                    setEditingAddress(null)
                    setAddressForm({
                      name: '',
                      phone: '',
                      address: '',
                      city: '',
                      zipCode: '',
                      country: 'United States',
                      isDefault: false
                    })
                  }}>
                    Add New Address
                  </button>
                </div>

                {showAddAddress && (
                  <form onSubmit={editingAddress ? handleUpdateAddress : handleAddAddress} className="account-form">
                    <h4>{editingAddress ? 'Edit Address' : 'Add New Address'}</h4>
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={addressForm.name}
                        onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        value={addressForm.phone}
                        onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Address</label>
                      <input
                        type="text"
                        value={addressForm.address}
                        onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>City</label>
                        <input
                          type="text"
                          value={addressForm.city}
                          onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Zip Code</label>
                        <input
                          type="text"
                          value={addressForm.zipCode}
                          onChange={(e) => setAddressForm({ ...addressForm, zipCode: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Country</label>
                      <select
                        value={addressForm.country}
                        onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                        required
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                        <option>Australia</option>
                      </select>
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="btn-primary">
                        {editingAddress ? 'Update Address' : 'Add Address'}
                      </button>
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => {
                          setShowAddAddress(false)
                          setEditingAddress(null)
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="addresses-list">
                  {addresses.length === 0 ? (
                    <p className="empty-state">No addresses saved. Add your first address above.</p>
                  ) : (
                    addresses.map(address => (
                      <div key={address.id} className={`address-card ${address.isDefault ? 'default' : ''}`}>
                        {address.isDefault && <span className="default-badge">Default</span>}
                        <div className="address-content">
                          <h4>{address.name}</h4>
                          <p>{address.phone}</p>
                          <p>{address.address}</p>
                          <p>{address.city}, {address.zipCode}</p>
                          <p>{address.country}</p>
                        </div>
                        <div className="address-actions">
                          {!address.isDefault && (
                            <button
                              className="btn-link"
                              onClick={() => setDefaultAddress(address.id)}
                            >
                              Set as Default
                            </button>
                          )}
                          <button
                            className="btn-link"
                            onClick={() => handleEditAddress(address)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn-link delete"
                            onClick={() => handleDeleteAddress(address.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="account-section">
                <div className="section-header">
                  <h3>Payment Methods</h3>
                  <button className="btn-primary" onClick={() => {
                    setShowAddPayment(true)
                    setEditingPayment(null)
                    setPaymentForm({
                      cardNumber: '',
                      cardHolder: '',
                      expiryDate: '',
                      cvv: '',
                      isDefault: false
                    })
                  }}>
                    Add Payment Method
                  </button>
                </div>

                {showAddPayment && (
                  <form onSubmit={handleAddPayment} className="account-form">
                    <h4>Add New Payment Method</h4>
                    <div className="form-group">
                      <label>Card Number</label>
                      <input
                        type="text"
                        value={paymentForm.cardNumber}
                        onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value })}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Card Holder Name</label>
                      <input
                        type="text"
                        value={paymentForm.cardHolder}
                        onChange={(e) => setPaymentForm({ ...paymentForm, cardHolder: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Expiry Date</label>
                        <input
                          type="text"
                          value={paymentForm.expiryDate}
                          onChange={(e) => setPaymentForm({ ...paymentForm, expiryDate: e.target.value })}
                          placeholder="MM/YY"
                          maxLength="5"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input
                          type="text"
                          value={paymentForm.cvv}
                          onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value })}
                          placeholder="123"
                          maxLength="3"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="btn-primary">Add Payment Method</button>
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => setShowAddPayment(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="payment-methods-list">
                  {paymentMethods.length === 0 ? (
                    <p className="empty-state">No payment methods saved. Add your first payment method above.</p>
                  ) : (
                    paymentMethods.map(payment => (
                      <div key={payment.id} className={`payment-card ${payment.isDefault ? 'default' : ''}`}>
                        {payment.isDefault && <span className="default-badge">Default</span>}
                        <div className="payment-content">
                          <h4>**** **** **** {payment.cardNumber.slice(-4)}</h4>
                          <p>{payment.cardHolder}</p>
                          <p>Expires: {payment.expiryDate}</p>
                        </div>
                        <div className="payment-actions">
                          {!payment.isDefault && (
                            <button
                              className="btn-link"
                              onClick={() => setDefaultPaymentMethod(payment.id)}
                            >
                              Set as Default
                            </button>
                          )}
                          <button
                            className="btn-link delete"
                            onClick={() => handleDeletePayment(payment.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'password' && (
              <div className="account-section">
                <div className="section-header">
                  <h3>Change Password</h3>
                </div>
                <form onSubmit={handlePasswordChange} className="account-form">
                  <div className="form-group">
                    <label>Current Password</label>
                    <input
                      type="password"
                      value={passwordForm.oldPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      minLength="6"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      minLength="6"
                      required
                    />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-primary">Change Password</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account

