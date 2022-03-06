import { network } from '../../utils/network'

const contractAddressMapper = {
  mainnet: '',
  rinkeby: '0x970d49A7A1DbEFB44Db44E97b99e026D845B18eA',
  hardhat: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  ganache: '',
}

const address = contractAddressMapper[network]

export default address
