import { ethers } from "ethers";
import VotingABI from "../abis/Voting.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_VOTING_CONTRACT_ADDRESS;

export const getContract = async () => {
  if (!window.ethereum) throw new Error("Please install MetaMask!");
  
  const provider = new ethers.BrowserProvider(window.ethereum);
  
  const signer = await provider.getSigner();

  if (!CONTRACT_ADDRESS) {
    console.error("Contract address is missing in .env file");
  }
  
  return new ethers.Contract(CONTRACT_ADDRESS, VotingABI.abi, signer);
};