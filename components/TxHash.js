import isMainnet from '../utils/isMainnet'
import network from '../utils/network'

import { IoMdOpen } from 'react-icons/io'

import { Flex, Link, Icon, Text } from '@chakra-ui/react'

const TxHash = ({ txHash }) => {
  return (
    <Link
      href={`https://${isMainnet ? '' : network + '.'}etherscan.io/tx/${txHash}`}
      target="_blank"
      rel="noopener noreferrer"
      bgGradient="linear(to-r, black, black)"
      bgClip="text"
      // fontSize="2xl"
      fontFamily="heading"
      textAlign="center"
      mb={3}
    >
      <Flex alignItems="center" gap={5}>
        <Text fontSize="xl" color="blue">
          View Transaction
        </Text>
        <Icon as={IoMdOpen} fontSize="18" color="darkBlue" />
      </Flex>
    </Link>
  )
}

export default TxHash