import React from 'react';
import image from "./Asset/Financial web3 Logo.png"
import { FaBars } from 'react-icons/fa';
import { RxLinkBreak1 } from "react-icons/rx";

interface HeaderProp {
    showLogout?: boolean;
    handleWalletConnect: () => void;
    walletInfo: {
        address: string;
        balance: string;
    } | null;
    handleLogout: () => void;
    handleDisconnect: () => void;
    handleToggleLogin: () => void;
    handleToggleSideContent: () => void;
}

const Header: React.FC<HeaderProp> = ({ 
    showLogout = false, 
    handleWalletConnect, 
    walletInfo, 
    handleLogout, 
    handleDisconnect,
    handleToggleLogin,
    handleToggleSideContent }) => {

    const logoImage = image;
    
  return (

    <header className='fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200'>
        <div className=',ax-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-between items-center h-16'>
                <div className='flex items-center gap-3'>
                    <div className='flex-shrink-0'>
                        <img src={logoImage} alt="Applogo" className='h-16 w-16 rounded-lg shadow-sm' />
                    </div>
                    <div className='hidden md:block'>
                        <h1 className='text-lg font-semibold text-gray-700'>
                            Financial Web3 Dashboard
                        </h1>
                        <p className='text-sm text-gray-500'>
                            Managing App
                        </p>
                    </div>
                    {showLogout && (
                         <button 
                            className='text-gray-500 text-3xl md:hidden ml-2'
                            onClick={handleToggleSideContent}>
                                <FaBars />
                         </button>
                    )}
                </div>
                {!showLogout && (
                     <button 
                            onClick={handleToggleLogin}
                            className='flex items-center gap-2 px-4 py-2 bg-gray-50
                            text-gray-600 hover:bg-gray-200 rounded-lg transition-colors
                            duration-200 border border-gray-200 shadow-sm'>
                        <svg className='h-5 w-5' viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2"
                                d="M7 16l-4-4m0 0l4-4m-4 4h14m-6 4v1a3 3 0 003 3h4a3 3 0 003-3V7a3 3 0 00-3-3h-4a3 3 0 00-3 3v1"
                            />
                        </svg>
                            SignUp
                     </button>
                )}

                {showLogout && (
                    <div className='flex items-center gap-4'>
                        {walletInfo ?  (
                            <div className='flex items-center justify-end gap-4'>
                                <div className='flex flex-col items-end mx-5'>
                                    <div className='flex items-center gap-2 px-4 sm:px-0 translate-x-8 sm:translate-x-0'>
                                        <div className='flex h-2 w-2 sm:h-2 sm:w-2 bg-green-500 rounded-full'></div>
                                        <span className='text-sm sm:tex-base text-blue-500 hidden sm:inline' >
                                            metamask wallet connected
                                        </span>
                                    </div>
                                </div>
                            <button 
                                onClick={handleDisconnect}
                                className='flex items-center gap-2 px-2 py-1 mt-1 text-sm sm:text-base 
                                w-auto sm:w-auto
                                bg-red-50 text-red-600 hover:bg-red-100 rounded-md 
                                transition-colors duration-200 
                                border border-red-200 shodow-sm '>
                                <RxLinkBreak1 className='h-6 w-6 sm:h-5 sm:w-5'/>
                                <span className='hidden sm:inline'>Disconnect</span>
                            </button>
                        </div>
                        ) : (
                            <button 
                                onClick={handleWalletConnect}
                                className='flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 bg-blue-50
                                text-blue-600 hover:bg-blue-100 rounded-lg transition-color
                                duration-200 border border-blue-200 shadow-sm
                                text-xs sm:text-base w-24 sm:w-auto'>
                            <svg className='h-5 w-5 sm:h-5 sm:w-5' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z " />
                            </svg>
                                Connect Metamask
                            </button>
                        )}
                        <button 
                            onClick={handleLogout}
                            className='flex items-center sm:gap-1 gap-2 px-2 sm:px-4 
                            py-1 sm:py-2 bg-gray-50 text-gray-600 hover:bg-gray-100 
                            rounded-lg transition-colors duration-200 border 
                            border-gray-200 shadow-sm
                            text-sm sm:text-base w-auto'>
                        <svg className='h-5 w-5 sm:h-5 sm:w-5' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                            <span className='hidden sm:inline'>LogOut</span>
                        </button>
                    </div>
                )}

            </div>
        </div>

       
        
         
       
        

    </header>

  )
}

export default Header
