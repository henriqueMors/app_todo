import { FormLabel, Switch, useColorMode } from '@chakra-ui/react'

export const Theme = ({ showLabel = false, ...props }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      {
        showLabel && (
          <FormLabel htmlFor='theme-toggler' mb={0}>
            Habilitar Tema Dark
          </FormLabel>
        )
      }
      <Switch
        id="theme-toggler"
        size="sm"
        isChecked={colorMode === 'dark'}
        isDisabled={false}
        value={colorMode}
        colorScheme="blue"
        mr={2}
        onChange={toggleColorMode}
        {...props}
      />
    </>
  )
}