import React, { ReactNode } from 'react'


interface DashboardLayoutProps {
    children: ReactNode;
    asideContent: ReactNode;
    isOpen: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, asideContent, isOpen }) => {

    return (
        <div className='flex relative h-full mt-14 bg-gray-100'>
            <aside className={`w-64 absolute bg-white shadow-md z-50 mt-2 transition-transform duration-300 ease-in-out 
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                bg-gradient-to-r from-slate-400 to-slate-100
                md:translate-x-0`}>
                {asideContent}
            </aside>
            <main className='flex-1 p-4 ml-0 md:ml-64'>
                <header className='mb-6'>
                    <h1 className='text-2xl font-semibold 
                    text-gray-700'>Dashboard</h1>
                </header>
                <div>{children}</div>                
            </main>
        </div>
    )
}

export default DashboardLayout;