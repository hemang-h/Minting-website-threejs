import NextLink from 'next/link'
import {
  Link,
  Container,
  Heading,
  Box,
  SimpleGrid,
  Button,
  List,
  ListItem,
  useColorModeValue,
  chakra
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { GridItem } from '../components/grid-item'
import { IoLogoTwitter, IoLogoInstagram, IoLogoGithub } from 'react-icons/io5'
import thumbYouTube from '../public/images/links/youtube.png'
import thumbInkdrop from '../public/images/works/inkdrop_eyecatch.png'
import Image from 'next/image'

const ProfileImage = chakra(Image, {
    shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
  })

const Home = () => {
    return(
        <Container>
    <Box
        borderRadius="lg"
        mb={6}
        p={3}
        textAlign="center"
        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
      >
        Welcome to the a Standard Demo website to mint NFTs
      </Box>

      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            TokenMinds
          </Heading>
          <p>Full service Blockchain & NFT Agency (Marketing / Developement)</p>
        </Box>
        <Box
          flexShrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          textAlign="center"
        >
          <Box
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            w="100px"
            h="100px"
            display="inline-block"
            borderRadius="full"
            overflow='hidden'
          >
            <ProfileImage
              src="/images/profileImage.jpeg"
              alt="Profile image"
              borderRadius='full'
              width="100%"
              height="100%"
            />
          </Box>
        </Box>
      </Box>

      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Work
        </Heading>
        <Paragraph>
        TokenMinds is one of the leading Blockchain Agencies, and has been voted the No 1 ranking one on Hackernoon.
        We make sure to not only do your blockchain development at the highest level,
        but also we make sure the most effective marketing is applied to reach the crypto 
        users, and a token sale is organised if required. Check our {' '}
          
            <Link href="https://tokenminds.co/">website </Link>
          
          for more details.
        </Paragraph>
        <Box align="center" my={4}>
          <NextLink href="/mint" scroll={false}>
            <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
              NFT Minting
            </Button>
          </NextLink>
        </Box>
      </Section>

      <Section delay={0.4}>
      <Heading as="h3" variant="section-title">
        Roadmap 
      </Heading>
      </Section>
      <BioSection>
          <BioYear>Story 1</BioYear>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis pellentesque orci. Maecenas vitae convallis erat. Nunc dignissim semper purus, eget semper nisi pellentesque in. Vestibulum vel diam ac libero sagittis fringilla. Nulla feugiat sem eget imperdiet ullamcorper. Maecenas interdum tincidunt ornare. Proin et diam id eros aliquet ornare.
      </BioSection>
      <Section delay={0.5}>
        <BioSection>
          <BioYear>Story 2</BioYear>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis pellentesque orci. Maecenas vitae convallis erat. Nunc dignissim semper purus, eget semper nisi pellentesque in. Vestibulum vel diam ac libero sagittis fringilla. Nulla feugiat sem eget imperdiet ullamcorper. Maecenas interdum tincidunt ornare. Proin et diam id eros aliquet ornare.
        </BioSection>
      </Section>
      <Section delay={0.6}>
        <BioSection>
          <BioYear>Story 3</BioYear>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis pellentesque orci. Maecenas vitae convallis erat. Nunc dignissim semper purus, eget semper nisi pellentesque in. Vestibulum vel diam ac libero sagittis fringilla. Nulla feugiat sem eget imperdiet ullamcorper. Maecenas interdum tincidunt ornare. Proin et diam id eros aliquet ornare.
        </BioSection>
      </Section>

      <Section delay={0.6}>
        <Heading as="h3" variant="section-title">
          Contact Us
        </Heading>
        <List>
          <ListItem>
            <Link href="https://github.com/craftzdog" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoGithub />}
              >
                @craftzdog
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://twitter.com/inkdrop_app" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoTwitter />}
              >
                @inkdrop_app (English)
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://twitter.com/craftzdog" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoTwitter />}
              >
                @craftzdog (日本語)
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="https://instagram.com/craftzdog" target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoInstagram />}
              >
                @craftzdog
              </Button>
            </Link>
          </ListItem>
        </List>
      </Section>
      

        </Container>
    )
}

export default Home  