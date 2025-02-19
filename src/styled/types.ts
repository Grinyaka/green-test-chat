import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
export type Theme = {
  textColors: {
    primary: string
    secondary: string
    accent: string
  }
  backgroundColors: {
    primary: string
    secondary: string
    card: string
    cardActive: string

    button: string
    accent: string
    negative: string
  }
  fontSizes: {
    small: string
    medium: string
    large: string
    xlarge: string
  }
}
