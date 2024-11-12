import { ethers } from "ethers";
import Web3Modal from "web3modal";

interface walletServiceProps {
    provider: ethers.BrowserProvider;
    signer: ethers.Signer;
    address: string;
}

export async function walletService(): Promise<walletServiceProps | null> {

    const web3Modal = new Web3Modal ({
        cacheProvider: false,
        
    });

    try {

        const instance = await web3Modal.connect();
        const provider = new ethers.BrowserProvider(instance);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

    return { provider, signer, address };

    } catch (err) {

        console.log("Failed to connect wallet:", err);
        return null;
        
    }

    

}