import {
    Container, 
    Box, 
    Center,
    Heading
} from '@chakra-ui/react'

const page = () => {
    return(
        <Container>
            <Box
        borderRadius="lg"
        mb={6}
        p={3}
        textAlign="center"
        bg="blue"
      >
        Who wants a free Airdrop
      </Box>

      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            TokenMinds 
          </Heading>
          <p>Marketing/IDO/Development</p>
        </Box>
     </Box> 
        </Container>
    )
}

export default page 