import { useRoutes } from 'react-router-dom'
import { routes } from './routes'
import { useTheme } from '@/hooks/useTheme'

function App() {
  // Initialize theme on app mount
  useTheme()
  
  const elements = useRoutes(routes)
  return elements
}

export default App
