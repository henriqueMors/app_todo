import { Flex, useColorModeValue, FormControl, Heading, Input, FormErrorMessage, Button } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Theme } from './Theme/Theme'

export const Login = () => {
  const formBackground = useColorModeValue('white', 'gray.600')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    console.log(values)
    // aqui entra a chamada à API de login
    navigate('/cadastro') // exemplo: redireciona após o login
  }

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        direction="column"
        alignItems="center"
        background={formBackground}
        p={12}
        rounded={6}
        boxShadow="lg"
      >
        <Heading mb={6}>Login</Heading>

        <FormControl isInvalid={!!errors.email}>
          <Input
            {...register('email', { required: 'Campo obrigatório' })}
            placeholder="Informe seu e-mail"
            type="email"
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password} mt={4}>
          <Input
            {...register('password', { required: 'Campo obrigatório' })}
            placeholder="Informe sua senha"
            type="password"
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <Button
          mt={4}
          mb={2}
          w="100%"
          colorScheme="blue"
          type="submit"
          isLoading={isSubmitting}
          loadingText="Carregando..."
        >
          Entrar
        </Button>

        <Button
          mb={2}
          w="100%"
          colorScheme="blue"
          variant="outline"
          type="button"
          onClick={() => navigate('/cadastro', { replace: true })}
        >
          Cadastre-se
        </Button>
        <FormControl display="flex" alignItems="center" justifyContent="center">
          <Theme showLabel={true} />
        </FormControl>
      </Flex>
    </Flex>
  )
}