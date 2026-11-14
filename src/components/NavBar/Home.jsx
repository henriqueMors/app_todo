import { Box, Heading } from '@chakra-ui/react'
import { NavBar } from './NavBar/NavBar'

export const Home = () => {
  return (
    <>
      <NavBar />
      <Box p={6}>
        <Heading size="lg">Minhas tarefas</Heading>
      </Box>
    </>
  )
}