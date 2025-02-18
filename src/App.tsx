import {BrowserRouter, Route, Routes} from 'react-router'
import { ThemeProvider } from 'styled-components'
import { MainTheme } from './styled/Theme'

function App() {
  return (
    <ThemeProvider theme={MainTheme}>
      <BrowserRouter>
        <Routes>
          
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
