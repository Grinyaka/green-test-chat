import {BrowserRouter, Route, Routes} from 'react-router'
import { ThemeProvider } from 'styled-components'
import { MainTheme } from './styled/Theme'
import MainPage from './pages/main'

function App() {
  return (
    <ThemeProvider theme={MainTheme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
