import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [toast, setToast] = useState(null)

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    const savedWishlist = localStorage.getItem('wishlist')
    const savedUser = localStorage.getItem('user')
    const savedOrders = localStorage.getItem('orders')

    if (savedCart) setCartItems(JSON.parse(savedCart))
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
    if (savedUser) setUser(JSON.parse(savedUser))
    if (savedOrders) setOrders(JSON.parse(savedOrders))
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  // Save orders to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders))
  }, [orders])

  const showToast = (message, type = 'success') => {
    if (!message) {
      setToast(null)
      return
    }
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const addToCart = (product, variant = null) => {
    const productKey = variant 
      ? `${product.id}-${variant.color}-${variant.size}`
      : product.id
    
    const existingItem = cartItems.find(item => 
      variant 
        ? item.id === product.id && item.variant?.color === variant.color && item.variant?.size === variant.size
        : item.id === product.id && !item.variant
    )

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id && 
        (!variant || (item.variant?.color === variant.color && item.variant?.size === variant.size))
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCartItems([...cartItems, { 
        ...product, 
        quantity: 1,
        variant: variant || null
      }])
    }
    showToast('Product added to cart!', 'success')
  }

  const removeFromCart = (productId, variant = null) => {
    setCartItems(cartItems.filter(item => {
      if (variant) {
        return !(item.id === productId && 
                 item.variant?.color === variant.color && 
                 item.variant?.size === variant.size)
      }
      return item.id !== productId || item.variant !== null
    }))
    showToast('Product removed from cart', 'info')
  }

  const updateQuantity = (productId, quantity, variant = null) => {
    if (quantity <= 0) {
      removeFromCart(productId, variant)
    } else {
      setCartItems(cartItems.map(item => {
        if (variant) {
          if (item.id === productId && 
              item.variant?.color === variant.color && 
              item.variant?.size === variant.size) {
            return { ...item, quantity }
          }
        } else {
          if (item.id === productId && !item.variant) {
            return { ...item, quantity }
          }
        }
        return item
      }))
    }
  }

  const toggleWishlist = (product) => {
    const isInWishlist = wishlist.some(item => item.id === product.id)
    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item.id !== product.id))
      showToast('Removed from wishlist', 'info')
    } else {
      setWishlist([...wishlist, product])
      showToast('Added to wishlist!', 'success')
    }
  }

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId)
  }

  const login = (email, password) => {
    // Mock authentication
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: email,
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff'
    }
    setUser(mockUser)
    showToast('Welcome back!', 'success')
    return true
  }

  const signup = (name, email, password) => {
    // Mock signup
    const newUser = {
      id: Date.now(),
      name: name,
      email: email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`
    }
    setUser(newUser)
    showToast('Account created successfully!', 'success')
    return true
  }

  const logout = () => {
    setUser(null)
    showToast('Logged out successfully', 'info')
  }

  const placeOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      ...orderData,
      date: new Date().toISOString(),
      status: 'processing'
    }
    setOrders([newOrder, ...orders])
    setCartItems([])
    showToast('Order placed successfully!', 'success')
    return newOrder.id
  }

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = (discount = 0) => {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    const discountAmount = subtotal * (discount / 100)
    return {
      subtotal,
      discount: discountAmount,
      total: subtotal - discountAmount
    }
  }

  const value = {
    cartItems,
    wishlist,
    user,
    orders,
    toast,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleWishlist,
    isInWishlist,
    login,
    signup,
    logout,
    placeOrder,
    getCartItemCount,
    getTotalPrice,
    showToast
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

