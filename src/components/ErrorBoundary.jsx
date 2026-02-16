import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" style={{
          padding: '2rem',
          textAlign: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h2>Something went wrong</h2>
          <p>Please refresh the page or try again later.</p>

          {this.state.error && (
            <div
              style={{
                marginTop: '1rem',
                maxWidth: '600px',
                textAlign: 'left',
                background: '#fee2e2',
                color: '#991b1b',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
                wordBreak: 'break-word',
              }}
            >
              <strong>Error:</strong>{' '}
              <code>{this.state.error.toString()}</code>
            </div>
          )}

          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
            style={{ marginTop: '1rem' }}
          >
            Refresh Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

