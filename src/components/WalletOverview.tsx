import React from 'react'

interface WalletOverviewProps {
    address: string;
    balance: string;
}

const WalletOverview: React.FC<WalletOverviewProps> = ({ address, balance }) => {

    const shortenAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }

  return (

    <div className='mt-4 p-4 bg-white rounded-lg shadow-lg w-full max-w-sm'>
        <h3 className='text-xl text-gray-600 font-semibold'>Wallet Information</h3>

        <div className='flex items-center justify-between'>
            <p className='text-sm font-medium text-gray-700'>Address:</p>
            <p className='text-sm font-mono text-gray-700'>{shortenAddress(address)}</p>
        </div>
       <div className='flex items-center justify-between mt-3'>
            <p className='text-sm font-medium text-gray-500'>Balance:</p>    
            <p className='text-lg font-semibold text-green-500'>{balance} ETH</p>
       </div>
        
    </div>

  )
}

export default WalletOverview