import { toast } from 'react-toastify'

// export const network = process.env.ETH_USED_NETWORK || 'rinkeby'
export const network = 'rinkeby'

export const networkIdMapper = {
  mainnet: 1,
  rinkeby: 4,
  hardhat: 31337, // default hardhat localhost
  ganache: 1337, // default gananche localhost
}

export const networkId = networkIdMapper[network]

export const showNetworkToast = (netId) => {
  const networkName = Object.keys(networkIdMapper).find((key) => networkIdMapper[key] === netId)
  toast.info(`Please change your ETH network to ${networkName}`)
}

export default network