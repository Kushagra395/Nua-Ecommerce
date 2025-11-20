import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '@/stores/cartSlice'
import { ProductCard } from '@/components/ProductCard'
import type { Product } from '@/api/types'

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'Test Description',
  category: 'electronics',
  image: 'https://via.placeholder.com/200',
  rating: {
    rate: 4.5,
    count: 100,
  },
}

const renderWithProviders = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
  })

  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  )
}

describe('ProductCard', () => {
  it('renders product information', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
    expect(screen.getByText('4.5')).toBeInTheDocument()
  })

  it('displays product image with alt text', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    
    const image = screen.getByAltText('Test Product')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', mockProduct.image)
  })

  it('has accessible quantity selector', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    
    const select = screen.getByRole('combobox', { name: /quantity selector/i })
    expect(select).toBeInTheDocument()
    expect(select).toHaveAttribute('aria-label')
  })

  it('has accessible add to cart button', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    
    const button = screen.getByRole('button', { name: /add.*to cart/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label')
  })

  it('allows quantity selection', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    
    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: '3' } })
    expect(select).toHaveValue('3')
  })

  it('has keyboard accessible image and title', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    
    const title = screen.getByText('Test Product')
    expect(title).toHaveAttribute('role', 'button')
    expect(title).toHaveAttribute('tabIndex', '0')
  })
})
