import { Button } from '@chakra-ui/react'

import useWeb3Modal from '../../hooks/useWeb3Modal'

const ConnectWallet = () => {
  const { connect } = useWeb3Modal()
  return (
    <Button onClick={connect} colorScheme="teal" size="md">
      Connect Wallet
    </Button>
  )
}

export default ConnectWallet