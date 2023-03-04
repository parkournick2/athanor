import Routes from './Routes'
import { defaultQueryFn } from './hooks/api'
import { usePersistReactQueryWithIndexedDB } from './hooks/usePersistReactQueryWithIndexedDB'
import { theme } from './theme/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const queryCache = new QueryCache()
const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      // Consider cache data stale after 5s
      staleTime: 5000,
      // Store cache data for a maximum of 6h
      cacheTime: 6000 * 60 * 60,
    },
  },
})

const App: React.FC = () => {
  usePersistReactQueryWithIndexedDB(queryClient)

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

root.render(<App />)
