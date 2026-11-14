import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'dark',     // app abre no modo escuro
  useSystemColorMode: false,
}

const colors = {
  brand: {
    50: '#e6f6ff',
    100: '#b3e3ff',
    200: '#80d0ff',
    300: '#4dbdff',
    400: '#1aaaff',
    500: '#0090e6', // cor principal
    600: '#0070b4',
    700: '#005082',
    800: '#003050',
    900: '#00101f',
  },
}

const fonts = {
  heading: `'Poppins', sans-serif`,
  body: `'Inter', sans-serif`,
}

const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
    },
  }),
}

const components = {
  Button: {
    defaultProps: {
      colorScheme: 'brand',
    },
  },
}

const theme = extendTheme({ config, colors, fonts, styles, components })

export default theme