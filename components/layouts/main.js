 import Head from 'next/head'
 import Navbar from '../navbar'
 import {Box, container} from '@chakra-ui/react'

 const Main = ({children, router}) => {
     return(
         <Box as="main" pb={8}>
             <Head>
                 <meta name="viewport" content="width-device-width, intial-scale=1" />
                 <meta name="description" content="TOkenMinds Minting" />
             </Head>

             <container maxW="container.md" pt={14}>
                 {children}
             </container>
         </Box>
     )
 } 

 export default Main