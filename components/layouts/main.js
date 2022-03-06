 import Head from 'next/head'
 import Navbar from '../navbar.js'
 import {Box, Container} from '@chakra-ui/react'

 const Main = ({children, router}) => {
     return(
         <Box as="main" pb={8}>
             <Head>
                 <meta name="viewport" content="width-device-width, intial-scale=1" />
                 <meta name="description" content="TOkenMinds Minting" />
             </Head>

            <Navbar path={router.asPath} />

             <Container maxW="container.md" pt={14}>
                 {children}
             </Container>
         </Box>
     )
 } 

 export default Main