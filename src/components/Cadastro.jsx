import { Flex, useColorModeValue, FormControl, Heading, Input, FormErrorMessage, Button, useToast } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Theme } from './Theme/Theme'
import { useAuth } from '../context/JWTAuthContext'

export const Cadastro = () => {
  const formBackground = useColorModeValue('white', 'gray.600')
  const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } = useForm()
  const navigate = useNavigate()
  const toast = useToast()
  const { register: registerUser } = useAuth()

  const onSubmit = async (values) => {
    const { confirmPassword, ...dados } = values

    try {
      await registerUser(dados)
      toast({
        title: 'Cadastro realizado!',
        description: 'Agora é só fazer o login.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
      navigate('/login', { replace: true })
    } catch (error) {
      toast({
        title: 'Erro ao cadastrar',
        description: error?.detail ? JSON.stringify(error.detail) : 'Tente novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
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
        <Heading mb={6}>Cadastro</Heading>

        <FormControl isInvalid={!!errors.nome}>
          <Input
            {...register('nome', { required: 'Campo obrigatório' })}
            placeholder="Informe seu nome"
            type="text"
          />
          <FormErrorMessage>{errors.nome?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email} mt={4}>
          <Input
            {...register('email', { required: 'Campo obrigatório' })}
            placeholder="Informe seu e-mail"
            type="email"
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password} mt={4}>
          <Input
            {...register('password', {
              required: 'Campo obrigatório',
              minLength: { value: 8, message: 'A senha deve ter pelo menos 8 caracteres' },
            })}
            placeholder="Crie uma senha"
            type="password"
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.confirmPassword} mt={4}>
          <Input
            {...register('confirmPassword', {
              required: 'Campo obrigatório',
              validate: (value) => value === getValues('password') || 'As senhas não conferem',
            })}
            placeholder="Confirme sua senha"
            type="password"
          />
          <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
        </FormControl>

        <Button
          mt={6}
          mb={2}
          w="100%"
          colorScheme="blue"
          type="submit"
          isLoading={isSubmitting}
          loadingText="Cadastrando..."
        >
          Cadastrar
        </Button>

        <Button
          mb={4}
          w="100%"
          colorScheme="blue"
          variant="outline"
          type="button"
          onClick={() => navigate('/login', { replace: true })}
        >
          Já tenho conta
        </Button>

        <FormControl display="flex" alignItems="center" justifyContent="center">
          <Theme showLabel={true} />
        </FormControl>
      </Flex>
    </Flex>
  )
}