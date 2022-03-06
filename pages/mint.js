import { Container, Heading, SimpleGrid, Divider, Box, Flex, Text } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'
import useWeb3Modal from '../hooks/useWeb3Modal'
import Landing from './Landing'



const mint = () => {
  const { web3Provider } = useWeb3Modal() 
  return (
  <Layout title="Minting">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Minting
      </Heading>

    <Box>
      {
        web3Provider ? (
          <Landing />
        )
        :
        (
          <Flex alignItems="center" justifyContent="center">
            <Text fontSize="lg">
              Please connect your Metamask :)
            </Text>
          </Flex>
        )
      }
    </Box>

    </Container>
   </Layout> 
  
  )      
}
export default mint
export { getServerSideProps } from '../components/chakra'