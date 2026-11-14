import {Flex, UserColorModeValue} from '@chakra-ui/react'

export const Login = () => {
  return (
    <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
    >
        <Flex
            direction="column"
            alignItems="center"
            background={UserColorModeValue('gray.100', 'gray.600')}
            p={12}
            rounded={6}
            boxShadow={lg}
        > 
          Login
        </Flex>
    </Flex>
  )
}