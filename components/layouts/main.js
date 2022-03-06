 import Head from 'next/head'
 import Navbar from '../navbar.js'
 import {Box, Container} from '@chakra-ui/react'
 import VoxelDogLoader from '../voxel-loader'
 import dynamic from 'next/dynamic'
 import Footer from '../Footer.js'

const LazyVoxelDog = dynamic(() => import('../voxel'), {
  ssr: false,
  loading: () => <VoxelDogLoader />
})
 
 const Main = ({children, router}) => {
     return(
         <Box as="main" pb={8}>
             <Head>
                 <meta name="viewport" content="width-device-width, intial-scale=1" />
                 <meta name="description" content="TOkenMinds Minting" />
             </Head>

            <Navbar path={router.asPath} />

            <Container maxW="container.md" pt={14}>
                <LazyVoxelDog />

                {children}

                <Footer />

            </Container>
         </Box>
     )
 } 

 export default Main