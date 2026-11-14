import { Flex, Heading, Button, Text, useColorModeValue } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/JWTAuthContext'
import { Theme } from '../Theme/Theme'

export const NavBar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const navBackground = useColorModeValue('white', 'gray.700')

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <Flex
      as="nav"
      px={6}
      py={4}
      alignItems="center"
      justifyContent="space-between"
      background={navBackground}
      boxShadow="sm"
    >
      <Heading size="md">FastToDo</Heading>

      <Flex alignItems="center" gap={4}>
        {user && <Text>Olá, {user.username}</Text>}
        <Theme />
        <Button size="sm" colorScheme="red" variant="outline" onClick={handleLogout}>
          Sair
        </Button>
      </Flex>
    </Flex>
  )
}