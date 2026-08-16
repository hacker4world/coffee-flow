import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './context/CartContext'
import { TableProvider } from './context/TableContext'
import { CategoryProvider } from './context/CategoryContext'
import { ProductProvider } from './context/ProductContext'
import { OrderProvider } from './context/OrderContext'
import { LanguageProvider } from './i18n/LanguageContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <CartProvider>
          <TableProvider>
            <CategoryProvider>
              <ProductProvider>
                <OrderProvider>
                  <App />
                </OrderProvider>
              </ProductProvider>
            </CategoryProvider>
          </TableProvider>
        </CartProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
