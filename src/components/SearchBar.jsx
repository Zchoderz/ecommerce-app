import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { products } from '../data/products'

function SearchBar({ onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const navigate = useNavigate()

  const handleSearch = (e) => {
    const value = e.target.value
    setQuery(value)

    if (value.trim()) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.description.toLowerCase().includes(value.toLowerCase()) ||
        product.category.toLowerCase().includes(value.toLowerCase())
      )
      setResults(filtered.slice(0, 5))
    } else {
      setResults([])
    }
  }

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`)
    setQuery('')
    setResults([])
    if (onClose) onClose()
  }

  return (
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={handleSearch}
          className="search-input"
          autoFocus
        />
        {query && (
          <button onClick={() => { setQuery(''); setResults([]) }} className="search-clear">
            ×
          </button>
        )}
      </div>
      {results.length > 0 && (
        <div className="search-results">
          {results.map(product => (
            <div
              key={product.id}
              className="search-result-item"
              onClick={() => handleProductClick(product.id)}
            >
              <img src={product.image} alt={product.name} />
              <div className="search-result-info">
                <h4>{product.name}</h4>
                <p>${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {query && results.length === 0 && (
        <div className="search-no-results">
          <p>No products found</p>
        </div>
      )}
    </div>
  )
}

export default SearchBar

