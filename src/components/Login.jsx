import { Flex, useColorModeValue, FormControl, Heading, Input, FormErrorMessage } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

export const Login = () => {
  const formBackground = useColorModeValue('white', 'gray.600')
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (values) => {
    console.log(values)
  }
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
        <Heading mb={6}>Login</Heading>
        <FormControl isInvalid={!!errors.email}>
          <Input
            {...register('email', { required: 'Email is required' })}
            placeholder="Email"
            type="email"
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password} mt={4}>
          <Input
            {...register('password', { required: 'Password is required' })}
            placeholder="Password"
            type="password"
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
      </Flex>
    </Flex>
  )
}