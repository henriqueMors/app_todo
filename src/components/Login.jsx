import { Flex, useColorModeValue } from '@chakra-ui/react'

export const Login = () => {
  const formBackground = useColorModeValue('white', 'gray.600')

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        direction="column"
        alignItems="center"
        background={formBackground}
        p={12}
        rounded={6}
        boxShadow="lg"
      >
        Login
      </Flex>
    </Flex>
  )
}