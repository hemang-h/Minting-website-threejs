import { useState } from 'react'

import { Box, Flex, Heading, Icon, Button } from '@chakra-ui/react'

import { IoIosRemove, IoIosAdd } from 'react-icons/io'

const Mint = (props) => {
  const { maxMint, numberOfToken, mint } = props
  const [amount, setAmount] = useState(1)

  return (
    <>
      <Flex alignItems="center" mt="8">
        <Box
          role="button"
          bgColor="offwhite"
          borderRadius="full"
          w="12"
          h="12"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => setAmount((amount) => Math.max(1, amount - 1))}
        >
          <Icon as={IoIosRemove} color="offblack" fontSize="32" />
        </Box>
        <Heading
          as="h2"
          bgGradient="linear(to-r, black, black)"
          bgClip="text"
          fontWeight="500"
          fontSize={{ base: '4xl', lg: '4xl' }}
          textAlign="center"
          mx="20"
        >
          {amount}
        </Heading>
        <Box
          role="button"
          bgColor="offwhite"
          borderRadius="full"
          w="12"
          h="12"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => setAmount((amount) => Math.min(maxMint - numberOfToken, amount + 1))}
        >
          <Icon as={IoIosAdd} color="offblack" fontSize="32" />
        </Box>

        <Button
          borderRadius="full"
          fontFamily="heading"
          fontWeight="500"
          bgGradient="linear(to-r, tealDark, teal)"
          borderColor="black"
          color="offwhite"
          px="40px"
          h="35px"
          fontSize="xl"
          borderWidth="2px"
          _hover={{
            bgGradient: 'linear(to-r, tealDark, teal)',
            textDecoration: 'none',
          }}
          _active={{ bgGradient: 'linear(to-r, tealDark, teal)' }}
          onClick={() => mint(amount)}
          // isLoading={loading}
          // loadingText={loading ? 'Processing...' : undefined}
          ml={5}
        >
          Mint Now
        </Button>
      </Flex>
    </>
  )
}

export default Mint