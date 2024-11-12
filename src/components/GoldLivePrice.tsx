import React, { useEffect, useState } from 'react'
import goldImage from './Asset/gold-icon.svg'
import axios from 'axios';


interface GoldLivePriceProps {
    buy: number;
    sell: number;
    date: string;
    change: number;
    changeText: string;
}

const GoldLivePrice: React.FC<GoldLivePriceProps> = () => {

    const [goldPrice, setGoldPrice] = useState<GoldLivePriceProps | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<String | null>(null);
    
    const parseThaiDate = (thaiDate: string): string => {
        const [day, monthThai, yearThai] = thaiDate.split(" ");
        const thaiMonths = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน",
                            "กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาม"
        ];
        const monthIndex = thaiMonths.indexOf(monthThai);
        const year = parseInt(yearThai) - 543;

        if (monthIndex !== -1) {
            // Manually format the date as DD/MM/YYYY
            const formatDate = `${day.padStart(2, '0')} / ${(monthIndex +1).toString().padStart(2,'0')} / ${year}`;
            return formatDate;
        }

        return "Invalid Date;"
    }
    
    const fetchGoldPrice = async () => {
        try {

            const response = await axios.get('https://api.chnwt.dev/thai-gold-api/latest');
            const data = response.data
            console.log(data);
            
            setGoldPrice({
                buy: data.response.price.gold_bar.buy,
                sell: data.response.price.gold_bar.sell,
                date: parseThaiDate(data.response.date),
                change: data.response.price.change.compare_yesterday,
                changeText: data.response.price.change.compare_yesterday > 0 ? 'High' : 'Low',
            })
            console.log(data.response.date);
            
        } catch (err) {
            setError("Cannot fetch gold price");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGoldPrice();
    },[])
   

  return (

    <div className='bg-white rounded-lg shadow-lg mt-2 p-4 max-w-md mx-auto'>
        <div className='flex justify-between mb-2'>
            <div className='flex items-center'>
                <img 
                    src={goldImage} 
                    alt="Gold Icon" 
                    className='w-10 h-10 mr-3 mb-1'/>
                <h2 className='text-xl font-bold text-center text-gray-600'>Gold Price</h2>
            </div>
        </div>
        {loading? (
            <p>Loading...</p>
        ) : error ? (
            <p className='text-red-500'>{error}</p>
        ) : (
            goldPrice && (
                <div className='text-gray-600 space-y-3'>
                    <div className='gid grid-cols-2 gap-4'>
                        <div className='p-2 bg-gray-50 rounded-lg'>
                            <div className='text-sm text-gray-500'>Buy:</div>
                            <div className='text-xl font-semibold text-gray-600 mt-1'>
                                ฿{goldPrice.buy.toLocaleString()}</div>
                        </div>
                        <div className='p-2 bg-gray-50 rounded-lg'>
                            <div className='text-sm text-gray-500'>Sell:</div>
                            <div className='text-xl font-semibold text-gray-600 mt-1'>
                                ฿{goldPrice.sell.toLocaleString()}</div>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <span className='text-sm text-gray-500'>Change:</span>
                        <span 
                            className={`text-lg font-semibold ml-2 
                            ${goldPrice.change > 0 ? 'text-green-600' 
                            : 'text-red-500' }`
                            }> ฿ {goldPrice.change} ({goldPrice.changeText})</span>
                    </div>
                    <div className='mt-2 font-semibold text-gray-500'> 
                        Date: <span>{new Date(goldPrice.date).toLocaleDateString()}</span>
                    </div>
                        
                </div>
                    
            )
        )}
    </div>

  )
}

export default GoldLivePrice