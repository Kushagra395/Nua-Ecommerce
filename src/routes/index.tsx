import { RouteObject } from 'react-router-dom'
import { MainLayout } from '@/components/Layout/MainLayout'
import { HomePage } from '@/pages/HomePage'
import { ProductDetailPage } from '@/pages/ProductDetailPage'
import { CartPage } from '@/pages/CartPage'
import { CheckoutPage } from '@/pages/CheckoutPage'
import { OrderConfirmationPage } from '@/pages/OrderConfirmationPage'
import { ProductListPage } from '@/pages/ProductListPage'
import { CategoryPage } from '@/pages/CategoryPage'
import { SearchPage } from '@/pages/SearchPage'
import { WishlistPage } from '@/pages/WishlistPage'
import { ComingSoonPage } from '@/pages/ComingSoonPage'

export const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/product/:id', element: <ProductDetailPage /> },
      { path: '/category/:slug', element: <CategoryPage /> },
      { path: '/search', element: <SearchPage /> },
      { path: '/wishlist', element: <WishlistPage /> },
      { path: '/cart', element: <CartPage /> },
      { path: '/checkout', element: <CheckoutPage /> },
      { path: '/order-confirmation', element: <OrderConfirmationPage /> },
      { path: '/signin', element: <ComingSoonPage feature="Sign In" /> },
      { path: '/signup', element: <ComingSoonPage feature="Sign Up" /> },
    ],
  },
]