import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'
import useWeb3Modal from '../hooks/useWeb3Modal'



const mint = () => {
  const { web3Provider } = useWeb3Modal() 
  return (
  <Layout title="Minting">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Minting
      </Heading>
    </Container>
   </Layout> 
)      
}
export default mint
export { getServerSideProps } from '../components/chakra'