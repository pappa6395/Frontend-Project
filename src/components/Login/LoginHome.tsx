import hero1 from '../Asset/hero1.png'
import hero2_1 from '../Asset/hero2_1.jpeg';
import hero2_2 from '../Asset/hero2_2.jpg';
import hero2_3 from '../Asset/hero2_3.jpeg';
import hero3 from '../Asset/hero3.jpeg';
import Carousel from './Carousel/Carousel';
import presenter from '../Asset/WebPresenter2 Medium.png'

interface LogingHomeProps {
    handleToggleLogin: () => void;
}

const LoginHome: React.FC<LogingHomeProps> = ({ handleToggleLogin }) => {

  return (

    <main className='flex flex-col items-center justify-center 
        min-h-screen w-screen bg-green-50 text-gray-800'>
        {/* Hero Section */}
        <section className='relative flex flex-col max-w-full text-center py-16'>
            <div className='flex-row inset-0 opacity-45 w-screen'>
                <img src={hero1} alt="hero BG" className='object-cover w-full h-screen sm:h-full'/>
            </div>
            <div className='absolute flex flex-row md:text-wrap justify-center items-center inset-0 z-10 p-8'>
                <div className='flex gap-4 -translate-y-10 sm:-translate-y-0'>
                    <div className='flex-col self-center mb-10'>
                        <h1 className='text-4xl bg-gradient-to-r from-green-600 via-orange-300
                         to-indigo-400 inline-block text-transparent bg-clip-text 
                         font-extrabold mb-10 text-gradient- tracking-tight mt-4 sm:mt-0'>
                            Take Control of Your Financial Future
                        </h1>
                        <div className='block sm:hidden'>
                            <Carousel />
                        </div>
                        <div className='hidden sm:block w-[600px]'>
                            <p className='text-xl font-semibold mb-4 text-gray-700'>
                                Manage your income, expense, savings goals, 
                                and investments all in one place.
                            </p>
                            <p className='text-xl font-semibold mb-4 text-gray-700'>
                                Get detailed insights, set personalized goals 
                                and track your progress toward financial stability.
                            </p>
                            <p className='text-xl font-semibold mb-4 text-gray-700'>
                                Connect your wallet for real-time crypto tracking 
                                and experience secure, easy-to-use financial management.
                            </p>
                        </div>
                        <div className='absolute bg-green-600 text-white rounded-full
                        border outline-none hover:bg-green-800 font-semibold
                        p-4 mt-5 sm:translate-x-56 mx-2 hidden sm:block'>
                            <button 
                                className='cursor-pointer'
                                onClick={handleToggleLogin}>
                                Getting Started
                            </button>
                        </div>  
                    </div>
                    <div className='hidden md:block translate-y-5'>
                        <img src={presenter} alt="presenter"/>
                    </div>
                </div>
            </div>
        </section>
        {/* Feature Section */}
        <section className='flex flex-col items-center justify-center mt-16 space-y-8'>
            <div className='flex flex-col md:flex-row gap-4 md:gap-6 max-h-96 mb-4 md:mb-0
                w-screen md:mx-auto mt-40 md:mt-0 px-4 md:px-8 justify-center items-center
                translate-x-0 sm::translate-x-32 md:translate-x-0 lg:translate-x-0 xl:translate-x-0'>
                <div className='flex flex-col w-screen p-5 items-center'>
                    <img src={hero2_1} alt="hero2_1" className='rounded-lg shadow-lg w-96 h-auto'/>
                </div>
                <div className='flex flex-col w-screen p-5 items-center'>
                    <img src={hero2_2} alt="hero2_2" className='rounded-lg shadow-lg w-96 h-auto'/>
                </div>
                <div className='flex flex-col w-screen p-5 items-center'>
                    <img src={hero2_3} alt="hero2_3"className='rounded-lg shadow-lg w-96 h-auto'/>
                </div>
            </div>
            <div className='flex flex-col items-center text-center max-w-screen md:text-wrap p-8 text-gray-700 space-y-4'>
                <div className='mt-52 md:mt-10'>
                    <h2 className='text-3xl font-bold text-green-700'>Empower Your Financial Journey</h2>
                </div>
                <div className='text-xl font-semibold text-gray-500 space-y-4 md:space-y-4'>
                    <p>With our dashboard, you'll experience a simplified, efficient, and personalized approach to managing your finances.</p>
                    <p>From detailed expense tracking to setting saving goals, we've got the tools you need to make informed financial decisions.</p>
                    <p>Our integration with crypto wallets brings you real-time tracking capabilities, ensuring you stay informed in every area of your financial life.</p>
                </div>
            </div>
        </section>
        <section className='relative flex flex-col items-center justify-center w-full mt-24 space-y-8'>
            <div className='flex flex-row inset-0 opacity-50 w-full h-[50vh] overflow-hidden'>
                <img src={hero3} alt="hero_3" className='w-full h-auto'/>
            </div>
            <div className='absolute flex flex-col items-center justify-center max-w-xl mx-auto p-6 space-y-8'>
                <blockquote className='text-xl italic text-gray-600'>
                    "A budget is more than just numbers; it's a reflection of your priorities and dreams. Manage your finances, and you shape your future."
                </blockquote>
                <p className='text-gray-700 text-lg'>
                    Join our community of mindful savers and start building a secure financial future today.
                </p>
                <div className='flex items-center justify-center'>
                    <input 
                        type="email"
                        placeholder='Enter your email'
                        className='w-full max-w-xs p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200'/>
                </div>
                <button className='px-4 w-36 h-10 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition'>
                    Subscribe
                </button>
            </div>
        </section>
        {/* Footer */}
        <footer className='flex flex-col md:flex-row items-center justify-between w-full px-8 py-6 bg-gray-600 text-white text-sm'>
            <div className='text-center md:text-left mb-4 md:mb-0'>
                <span>&#169; 2024 Personal Fianancial Web3 Dashboard. All rights reserved.</span>
            </div>
            <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 items-center'>
                <a href="#about" className='hover:text-green-400 transition'>About us</a>
                <a href="#privacy" className='hover:text-green-400 transition'>Privacy Policy</a>
                <a href="#terms" className='hover:text-green-400 transition'>Terms of Service</a>
                <a href="#contract" className='hover:text-green-400 transition'>Contract</a>
            </div>
        </footer>
    </main>
  )
}

export default LoginHome