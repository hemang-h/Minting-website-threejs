import { Button } from '@chakra-ui/react'
import { IoMdWallet } from 'react-icons/io'
import { FaEthereum } from 'react-icons/fa'

import walletUtils from '../../utils/wallet'

const ConnectedWallet = (props) => {
  const { formatWalletAddress } = walletUtils()
  return (
    <>
      <Button
        mr={5}
        onClick={() => {
          navigator.clipboard.writeText(props.balance)
        }}
        leftIcon={<FaEthereum />}
      >
        {props.balance}
      </Button>
      <Button
        onClick={() => {
          navigator.clipboard.writeText(props.address)
        }}
        leftIcon={<IoMdWallet />}
      >
        {formatWalletAddress(props.address)}
      </Button>
    </>
  )
}

export default ConnectedWallet