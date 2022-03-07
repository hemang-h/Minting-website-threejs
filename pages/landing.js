import useAlphaWhale from '../hooks/useAlphaWhale'

import TxHash from '../components/TxHash'
import Mint from '../components/Mint'

import { Heading, Progress, Container } from '@chakra-ui/react'


const Landing = () => {
  const {
    fetching,
    loading,
    
    txHash,
    
    maxPerWhitelist,
    maxPerAirdrop,
    maxPerTx,
    ownedWhitelist,
    ownedAirdrop,
    totalSupply,
    whitelistMint,
    airdropMint,
    publicMint,
    
  } = useAlphaWhale()

  const UIContent = (
    <>
      <Heading size="md" my={5}></Heading>
    </>
  )

  const UIPublicMint = (
    <>
      <Heading size="md" mb={5}>
        Public Mint
      </Heading>
      <Mint maxMint={maxPerTx} numberOfToken={totalSupply} mint={publicMint} />
    </>
  )

  const UIWhiteListMint = (
    <>
      <Heading size="md" mb={5}>
        Whitelist Mint
      </Heading>
      <Mint maxMint={maxPerWhitelist} numberOfToken={ownedWhitelist} mint={whitelistMint} />
    </>
  )

  const UIAirdropMint = (
    <>
      <Heading size="md" mb={5}>
        Airdrop Mint
      </Heading>
      <Mint maxMint={maxPerAirdrop} numberOfToken={ownedAirdrop} mint={airdropMint} />
    </>
  )

  return (
    <Container px={20} maxW="container.xl">
      {txHash && <TxHash txHash={txHash} />}
      {fetching && <Progress size="xs" isIndeterminate />}
      {loading && <Progress size="xs" isIndeterminate />}
      {!fetching && UIContent}
      {!fetching && UIWhiteListMint}
      {!fetching && UIAirdropMint}
      {!fetching && UIPublicMint}
      {/* {UIContent} */}
    </Container>
  )
}

export default Landing