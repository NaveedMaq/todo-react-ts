import './App.css'

import { ThemeProvider, CssBaseline } from '@mui/material';
import { customTheme } from './theme/customTheme';
import { Dashboard } from './pages/dashboard';

function App() {

  return (
    <ThemeProvider theme={customTheme}>
    <CssBaseline />
    <Dashboard />
  </ThemeProvider>
  )
}

export default App
