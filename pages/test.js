import React, { useState, useEffect } from 'react'
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import Navbar from "./navbar/index"
import bg from "../images/Bg.png"
import Image from 'next/image'
import { Icon } from '@iconify/react';
import popeye from "../images/popeye@2x.png"
import flash from "../images/flash_gordon@2x.png"
import benfica from "../images/benfica@2x.png"
import {NotificationManager} from 'react-notifications'
import TotemAbi from '../contracts/TotemABI.json'
import stormStrooper from "../images/original_stormtrooper@2x.png"
import group from "../images/Groupe 275@2x.png"
import phantom from "../images/phantom@2x.png"
import Footer from './footer'
import facebook from "../images/facebook.png"
import discord from "../images/discord.png"
import twitter from "../images/twitter.png"
import instagram from "../images/instagram.png"
import intersection from "../images/Intersection1.png"
import popeyeCollection from "../images/popeye-collection.png"
import flashGordon from "../images/flash-gordon.png"
import phantomCollection from "../images/phantom.png"
import benficasc from "../images/benfica.png"
import storm from "../images/storm.png"
import bg1 from "../images/bg1.png"
import bg2 from "../images/bg2.png"
import bg3 from "../images/bg3.png"
import bg4 from "../images/bg4.png"
import bg5 from "../images/bg5.png"
import popeyeGreen from "../images/popeyeGreen.png"
import popeyeEnemy from "../images/popeyeEnemy.png"
import phantomAnimal from "../images/phantomAnimal.png"
import flashKing from "../images/flashKing.png"
import food from "../images/food.png"
import popeyeBlue from "../images/popeyeBlue.png"
import totem from '../images/totem.png'
import polygon from "../images/polygon-matic-logo.png"
import { useRouter } from 'next/router'
import phantomPurple from "../images/phantomPurple.png"
import polygon1 from "../images/polygon-matic-logo.png"
import jeep from "../images/jeep.png"
import book from "../images/book.png"
import human from "../images/human2x.png"
import twitterBlue from "../images/twitterBlue.png"
import fbBlue from "../images/fbBlue.png"
import instaBlue from "../images/InstaBlue.png"
import tiktokBlue from "../images/tiktokBlue.png"
import CloseIcon from '@mui/icons-material/Close';
import { getPurchasedProducts ,getProductsByCollectionIds} from '../api/product'
import Modal from 'react-modal';
import styled from 'styled-components'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    backgroundColor: '#161a42',
    transform: 'translate(-50%, -50%)',
  },
};
const CONTRACT_ADDRESS = "0x3D9F895C786E2bBe7785763566ABe6db3c2F546c"
export default function dashboard() {
  const { authenticate, isAuthenticated, isInitialized, account, chainId,Moralis, logout } = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const [nfts, setNfts] = useState([])
  const [toAddress, setToAddress] = useState("")
  const [handling, setHandling] = useState(false)
  const [filteredNfts, setFilteredNfts] = useState([])
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [selectedNft, setSelectedNft] = useState(null)
  const lastDrop = [
    {
      title: popeyeBlue,
      image: popeyeGreen,
      name: "Popeye animated",
      rare: "ULTRA RARE",
      cost: 49,
      divide: "1190/2300",
      icon: book
    },
    {
      title: popeyeBlue,
      image: popeyeEnemy,
      name: "Bluto",
      rare: "UNCOMMON",
      cost: 59,
      divide: "2340/8000",
      icon: book
    },
    {
      title: popeyeBlue,
      image: jeep,
      name: "The Jeep",
      rare: "RARE",
      cost: 79,
      divide: "3230/5,500",
      icon: book
    },
    {
      title: popeyeBlue,
      image: phantomAnimal,
      name: "Devil",
      rare: "RARE",
      cost: 79,
      divide: "345/3000 ",
      icon: book
    },
    {
      title: flash,
      image: flashKing,
      name: "Prince Vultan",
      rare: "RARE",
      cost: 79,
      divide: "770/2300",
      icon: book
    },
    {
      title: popeyeBlue,
      image: food,
      name: "Spinach Can",
      rare: "ULTRA RARE",
      cost: 99,
      divide: "1190/2300",
      icon: book
    },
  ];
  const flattenNFTs = (data)=>{
    const tempProducts = []
    data.forEach(element => {
      tempProducts.push(element.product)
    });
    return tempProducts
  }
  useEffect(() => {
    const fetchData = async () => {
      const userEthNFTs = await Web3Api.account.getNFTs({ chain: "rinkeby", address: account })
      console.log("userEthNfts------->", userEthNFTs)
      setNfts([...userEthNFTs.result])
      return userEthNFTs;
    }
    if (account) {
      const result = fetchData()
    } else {
      getPurchasedProducts((error, res) => {
        if(res.data){
          const result = flattenNFTs(res.data)
          setFilteredNfts(result)
          console.log("myresult---->", result)
        }
        // console.log('error, res in pd--->>>', error, res)
      })
    }
  }, [account])
  useEffect(() => {
    console.log('nfts in userF---->', nfts)
    const filtered = nfts.filter((element) => {
      console.log("element.token_address, CONTRACT_ADDRESS---<>", element.token_address.toUpperCase(), CONTRACT_ADDRESS.toUpperCase())
      return element.token_address.toUpperCase() === CONTRACT_ADDRESS.toUpperCase()

    })
    const ids = filtered.map((nft)=>nft.token_id)
    console.log("ids- befor gpb-->", ids)
    getProductsByCollectionIds(ids.join(","),(error,res)=>{
       setFilteredNfts(res.data)
      console.log("error, res in gpbc....-->", error, res)
    })
    // console.log('filtered in userF--x-->', filtered)
    // setFilteredNfts(filtered)
  }, [nfts])
  const confirmTransfer = async ()=>{
    console.log("selectedNft---xxx------->", selectedNft)
    if(handling){
      return
    }
    setHandling(true)
    const finalParams = {
      from: account,
      to: toAddress,
      id: selectedNft.collectionId,
      amount:1,
      data: 0
    }
    let options = {
      contractAddress: CONTRACT_ADDRESS,
      functionName: "safeTransferFrom",
      abi: TotemAbi,
      params: finalParams
    };

    const message = await Moralis.executeFunction(options);
    setHandling(false)
    setShowTransferModal(false)
    NotificationManager.success("Transferred successfully!")
  }
  console.log("nfts--xxx->", filteredNfts)
  return (
    <div>
      <div style={{ backgroundColor: "#0D0F23", color: "#919CC1", fontFamily: "Chakra Petch" }} className='text-sm flex flex-col items-center'>
        <div className='w-4/5 '>

          <Navbar></Navbar>

          <div style={{ background: '#161A42 ', borderRadius: '16px' }} className='lg:h-16 w-full mt-16 flex items-center lg:flex-row flex-col'>
            <div className=''>
              <Image width={81} height={81} src={bg}></Image>
            </div>
            <div className='m-4'>
              <p style={{ fontFamily: "Poppins" }} className='text-2xl text-white'>MY DASHBOARD</p>
            </div>
            <div style={{ border: "2px solid #2E357B" }} className='lg:h-10 w-4/5 lg:w-0'>
            </div>
          </div>

          <div className='flex justify-end'>
            <div className='w-11/12 mt-10'>
              <div className='flex text-base items-start lg:flex-row flex-col'>
                <div className='text-md'>
                  <p className='text-white text-md'>My collection value</p>
                  <div style={{ color: "#0EA8D6", fontFamily: "Poppins" }} className='flex items-center'>
                    <p className='text-md'>3,43</p>
                    <Icon icon="mdi:ethereum" />
                  </div>
                  <div style={{ color: "#0EA8D6", fontFamily: "Poppins" }} className='flex items-center'>
                    <p className='text-md'>10003,29 $</p>
                  </div>
                </div>

                <div className='lg:ml-20 mt-5 lg:mt-0'>
                  <p className='text-white'>Owned NFTs</p>
                  <p style={{ color: "#0EA8D6", fontFamily: "Poppins" }}>7</p>
                </div>

                <div className='lg:ml-32 mt-5 lg:mt-0'>
                  <p className='text-white'>Favorite brand</p>
                  <Image width={90} height={27} src={popeye}></Image>
                </div>

                <div style={{ color: "#0EA8D6" }} className='lg:ml-48 mt-5 lg:mt-0 flex items-center'>
                  <Image src={discord}></Image>
                  <p style={{ fontFamily: "Poppins" }} className='ml-3 w-48'>Meet your community on our discord</p>
                </div>

              </div>


              <div>
                <p style={{ fontFamily: "Poppins" }} className='text-2xl text-white mt-10'>MY GALLERY</p>
              </div>

              <div style={{ fontFamily: "Poppins" }} className='mt-7 flex lg:flex-row flex-col'>
                <div className='p-1 w-24 h-8 flex justify-center items-center' style={{ border: "1px solid #2C3166", borderRadius: '100px' }}>
                  <p>POPEYE®</p>
                </div>

                <div className='mt-3 lg:mt-0 lg:ml-4 p-1 w-24 h-8 flex justify-center items-center' style={{ border: "1px solid #2C3166", borderRadius: '100px' }}>
                  <p>ASTERIX®</p>
                </div>

                <div className='mt-3 lg:mt-0 lg:ml-4 p-1 w-28 h-8 flex justify-center items-center' style={{ border: "1px solid #2C3166", borderRadius: '100px' }}>
                  <p>BENFICA FC®</p>
                </div>

                <div className='mt-3 lg:mt-0 lg:ml-4 p-1 w-32 h-8 flex justify-center items-center' style={{ border: "1px solid #2C3166", borderRadius: '100px' }}>
                  <p>TERMINATOR®</p>
                </div>

                <div className='mt-3 lg:mt-0 lg:ml-4 p-1 w-36 h-8 flex justify-center items-center' style={{ border: "1px solid #2C3166", borderRadius: '100px' }}>
                  <p>LAUGHING COW®</p>
                </div>
              </div>

              <div className='flex flex-col items-center lg:grid grid-cols-4 mt-10 gap-x-5 gap-y-12'>
                {filteredNfts.map(function (data) {
                  return (
                    <div style={{ background: "#161A42", width: "200px", height: "426px" }} className=' mt-0 w-full lg:w-max rounded-lg'>
                      <div style={{ borderRadius: '8px', height: "230px" }} className=' bg-white m-2'>
                        {/* <div className='relative top-2 left-2'>
                          <Image height={20} width={60} src={bg}></Image>
                        </div> */}
                        <div style={{ borderRadius: '8px' }} className=' flex justify-center items-center'>
                          {data.image == jeep
                            ?
                            <div className='mt-3'>
                              <Image width={134} height={186} src={bg}></Image>
                            </div>
                            :
                            <Image width={154} height={206} objectFit="cover" src={bg}></Image>
                          }
                        </div>
                      </div>
                      <div className='flex justify-end'>
                        <div style={{ background: "#161A42", border: "2px solid #2E357B", width: "34px", height: "34px" }} className='relative flex justify-center items-center rounded-full bottom-7'>
                          <Image src={bg}></Image>
                        </div>
                      </div>
                      <div className='p-3 relative bottom-7'>
                        <p className='text-lg text-white'>{data.name}</p>

                        <div className='relative flex items-center mt-3'>
                          {
                            data.rare == "RARE" && <p style={{ color: "#7AF4AE" }}>{data.rare}</p>
                          }
                          {
                            data.rare == "UNCOMMON" && <p style={{ color: "#ED5B62  " }}>{data.rare}</p>
                          }
                          {
                            data.rare == "ULTRA RARE" &&
                            <p style={{ color: "#F4D96C" }}>{data.rare}</p>
                          }
                          {
                            data.rare == "COMMON" && <p className='text-white'>{data.rare}</p>
                          }
                          <p className='absolute right-0 text-white'>Serie 1</p>
                        </div>

                        <div style={{ border: '1px solid #2E357B' }} className="w-full mt-2">
                        </div>
                        <div style={{ fontFamily: "Poppins" }} className='flex items-center relative mt-4'>
                          <p style={{ color: "#0EA8D6" }} className='text-white text-2xl'>{data.cost}$</p>
                          <p style={{ color: "#0EA8D6" }} className='ml-1 text-lg '>{data.priceUsd}</p>
                          <Image src={polygon1}></Image>
                          <p className='absolute right-0'>{data.divide}</p>
                        </div>

                        <div style={{ border: '1px solid #2E357B' }} className="w-full mt-2">
                        </div>
                        {
                          account &&
                          <div className='flex items-center justify-center mt-2' onClick={()=>{setSelectedNft(data); setShowTransferModal(true)}}>
                            <p className='text-white cursor-pointer'>TRANSFER TO</p>
                          </div>
                        }
                      </div>
                    </div>
                  )
                })}
              </div>

            </div>
          </div>

          <div className='flex justify-center items-center'>
            <div style={{ background: "#0EA8D6", width: "355px", borderRadius: '10px' }} className='cursor-pointer hover:opacity-80 mt-10 w-full h-10 flex justify-center items-center'>
              <p style={{ color: "#161A42" }} className="font-bold text-xl">COMPLETE YOUR COLLECTION</p>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <Footer className=""></Footer>

        </div>
      </div>

      {/* <div style={{ fontFamily: "Chakra Petch", borderRadius: "26px", top: "0", left: "0", transform: 'translate(calc(50vw - 50%), calc(50vh - 50%))' }} className=' opacity-100 p-2 mx-auto fixed bg-white w-4/5 lg:w-96'>
        <div className=' float-right'>
          <CloseIcon />
        </div>
        <div className='flex flex-col items-center text-center mt-5' style={{ color: "#161a42" }}>
          <p className='text-2xl'>Welcome,</p>
          <div className='w-48'>
            <p className='text-base'>You are officially a TOTEM digital figurine collector. Let’s spread the news !</p>
          </div>
        </div>
        <div className='w-full flex justify-center mt-2'>
          <Image width={94} height={145} src={human}></Image>
        </div>
        <div className=' flex justify-center mt-6'>
          <div style={{ border: '2px solid #727698', opacity: "0.27" }} className='w-4/5'>
          </div>
        </div>
        <div className='flex justify-center my-2' style={{ color: "#0EA8D6" }}>
          <p className=''>Share your new collectible now:</p>
        </div>
        <div className='flex justify-center items-center'>
          <div>
            <Image width={30} height={30} src={fbBlue}></Image>
          </div>
          <div className='ml-2'>
            <Image width={30} height={30} src={instaBlue}></Image>
          </div>
          <div className='ml-2'>
            <Image width={30} height={30} src={twitterBlue}></Image>
          </div>
          <div className='ml-2'>
            <Image width={30} height={30} src={tiktokBlue}></Image>
          </div>
        </div>
      </div> */}
      {
        showTransferModal &&
        <Modal
            isOpen
            onAfterOpen={()=>{}}
            onRequestClose={()=>{}}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <Title>Transfer To</Title>
            <TransferInput onChange={(e)=>{setToAddress(e.target.value)}} value={toAddress}/>  
            <ButtonLine>
              <ConfirmButton onClick={()=>{confirmTransfer()}}>Confirm</ConfirmButton>
              <div style={{width:30}}></div>
              <CloseButton onClick={()=>{setShowTransferModal(false)}}>Close</CloseButton>
            </ButtonLine>
        </Modal>
      }
      
    </div>
  )
}

const ButtonLine = styled.div`
  display: flex;
  // width: 300px;
`
const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
  color: white;
`
const TransferInput = styled.input`
  outline: none;
  padding: 5px 10px;
  border: 1px solid #aaa;
  width:400px;
`
const CloseButton = styled.div`
  margin: 0 auto;
  width: 100px;
  height:28px;
  // background-color: green;
  margin-top: 20px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;

`
const ConfirmButton = styled.div`
  margin: 0 auto;
  width: 100px;
  height:28px;
  // background-color: green;
  margin-top: 20px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;

`