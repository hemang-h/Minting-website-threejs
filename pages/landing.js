import useAlphaWhale from '../../hooks/useAlphaWhale'

import TxHash from '../../components/TxHash'
import Mint from '../../components/Mint'

import { Text, Flex, Heading, Progress, Container } from '@chakra-ui/react'
import { useState } from 'react'

const Landing = () => {
  const {
    fetching,
    loading,
    success,
    txHash,
    owned,
    owner,
    maxPerWhitelist,
    maxPerAirdrop,
    maxPerTx,
    ownedWhitelist,
    ownedAirdrop,
    whitelistMint,
    airdropMint,
    publicMint,
    reset,
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
      <Mint maxMint={maxPerTx} numberOfToken={0} mint={publicMint} />
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