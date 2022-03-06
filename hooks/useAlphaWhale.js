import { useCallback, useEffect, useMemo, useState } from 'react'

import { ethers } from 'ethers'

import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { parseEther } from '@ethersproject/units'
import { toast } from 'react-toastify'

import useWeb3Modal from './useWeb3Modal'
import useRequestState from './useRequestState'

import { showNetworkToast } from '../utils/network'
import wallet from '../utils/wallet'

import DATA from '../data/whitelist.json'

import CONTRACT_ADDRESS from '../contracts/AlphaWhale/addresses'
import CONTRACT from '../contracts/AlphaWhale/AlphaWhaleNFT.json'
import { keccak256 } from 'ethers/lib/utils'

const useAlphaWhale = () => {
  const { balance, address, chainId, signer, web3Provider, isSameNetwork } = useWeb3Modal()
  const { getProof } = wallet()

  const contract = useMemo(
    () => (isSameNetwork ? new Contract(CONTRACT_ADDRESS, CONTRACT.abi, signer) : null),
    [isSameNetwork, signer]
  )

  const [owned, setOwned] = useState()
  const [owner, setOwner] = useState()
  const [totalSupply, setTotalSupply] = useState()

  const [mintPrice, setMintPrice] = useState()
  const [maxPerWhitelist, setMaxPerWhitelist] = useState()
  const [maxPerAirdrop, setMaxPerAirdrop] = useState()
  const [maxPerTx, setMaxPerTx] = useState()

  const [ownedWhitelist, setOwnedWhitelist] = useState()
  const [ownedAirdrop, setOwnedAirdrop] = useState()
  

  const fetchState = useRequestState()
  const fetchInfo = useCallback(async () => {
    if (web3Provider && contract) {
      fetchState.start()

      const ownedNFTs = await contract.balanceOf(address)
      const owner = await contract.owner()
      const mintPrice = await contract.mintPriceInWei()
      const maxPerWhitelist = await contract.MAX_PER_WHITELIST_ADDRESS()
      const maxPerAirdrop = await contract.MAX_PER_AIRDROP_ADDRESS()
      const maxPerTx = await contract.MAX_PER_TX()
      const totalSupply = await contract.totalSupply()

      const ownedWhitelist = await contract.whitelistMinted(address)
      const ownedAirdrop = await contract.airdropMinted(address)
      

      const owned = ethers.utils.formatUnits(ownedNFTs, 0)

      const mintPriceValue = parseFloat(ethers.utils.formatEther(mintPrice))

      setOwned(owned)
      setOwner(owner)
      setMintPrice(mintPriceValue)
      setTotalSupply(totalSupply)

      setMaxPerWhitelist(ethers.utils.formatUnits(maxPerWhitelist, 0))
      setMaxPerAirdrop(ethers.utils.formatUnits(maxPerAirdrop, 0))
      setMaxPerTx(ethers.utils.formatUnits(maxPerTx, 0))

      setOwnedWhitelist(ethers.utils.formatUnits(ownedWhitelist, 0))
      setOwnedAirdrop(ethers.utils.formatUnits(ownedAirdrop, 0))

      fetchState.end()
    } else if (!contract) {
      showNetworkToast(chainId)
    }
  }, [web3Provider, contract, chainId, address, fetchState])

  useEffect(() => {
    fetchInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const state = useRequestState()
  const [success, setSuccess] = useState(false)
  const [txHash, setTxHash] = useState('')

  const whitelistMint = useCallback(
    (noOfTokenToMint) => {
      if (web3Provider && contract) {
        const fn = async () => {
          try {
            // ui state
            state.start()
            setSuccess(false)
            setTxHash(undefined)

            const proof = getProof(DATA.list, address)

            console.log(proof)

            const tx = await contract.whitelistMint(noOfTokenToMint, proof, {
              from: address,
              value: parseEther((noOfTokenToMint * mintPrice).toString()),
            })
            setTxHash(tx.hash)
            console.log(tx.hash)
            await tx.wait()
            await fetchInfo()
            setSuccess(true)
            toast.success(`Mint successfully.`)
          } catch (e) {
            console.log('Mint ERROR: ', e.message)
            if (e.error) {
              toast.error(`${e.error.message}`)
            } else if (e.code == 4001) {
              toast.info(`${e.message}`)
            }
          } finally {
            state.end()
          }
        }
        fn()
      } else if (!contract) {
        showNetworkToast(chainId)
      }
    },
    [web3Provider, contract, state, chainId, fetchInfo]
  )

  const airdropMint = useCallback(
    (noOfTokenToMint) => {
      if (web3Provider && contract) {
        const fn = async () => {
          try {
            // ui state
            state.start()
            setSuccess(false)
            setTxHash(undefined)

            const proof = getProof(DATA.list, address)

            console.log(proof)

            const tx = await contract.airdropMint(noOfTokenToMint, proof, {
              from: address,
            })
            setTxHash(tx.hash)
            await tx.wait()
            await fetchInfo()
            setSuccess(true)
            toast.success(`Mint successfully.`)
          } catch (e) {
            console.log('Mint ERROR: ', e.message)
            if (e.error) {
              toast.error(`${e.error.message}`)
            } else if (e.code == 4001) {
              toast.info(`${e.message}`)
            }
          } finally {
            state.end()
          }
        }
        fn()
      } else if (!contract) {
        showNetworkToast(chainId)
      }
    },
    [web3Provider, contract, state, chainId, fetchInfo]
  )

  const publicMint = useCallback(
    (noOfTokenToMint) => {
      if (web3Provider && contract) {
        const fn = async () => {
          try {
            // ui state
            state.start()
            setSuccess(false)
            setTxHash(undefined)

            const proof = getProof(DATA.list, address)

            console.log(proof)

            const tx = await contract.publicMint(noOfTokenToMint, {
              from: address,
            })
            setTxHash(tx.hash)
            await tx.wait()
            await fetchInfo()
            setSuccess(true)
            toast.success(`Mint successfully.`)
          } catch (e) {
            console.log('Mint ERROR: ', e.message)
            if (e.error) {
              toast.error(`${e.error.message}`)
            } else if (e.code == 4001) {
              toast.info(`${e.message}`)
            }
          } finally {
            state.end()
          }
        }
        fn()
      } else if (!contract) {
        showNetworkToast(chainId)
      }
    },
    [web3Provider, contract, state, chainId, fetchInfo]
  )

  const reset = useCallback(() => {
    state.end()
    fetchState.end()
    setSuccess(false)
    setTxHash(undefined)
  }, [fetchState, state])

  return {
    contract,
    fetching: fetchState.loading,
    loading: state.loading,
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
  }
}

export default useAlphaWhale