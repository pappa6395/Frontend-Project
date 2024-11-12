import React, { useEffect, useState } from 'react'
import { Banknote, ArrowRightLeft } from 'lucide-react'

const CurrencyExchange: React.FC = () => {

    const [exchangeRates, setExchangeRates] = useState<any>(null);
    const [selectedCurrencies, setSelectedCurrencies] = useState<string>('USD');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const currencies = [
        { code: 'USD', name: 'US Dollar' },
        { code: 'THB', name: 'Thai Baht' },
        { code: 'JPY', name: 'Japanese Yen' },
        { code: 'EUR', name: 'Euro' },
        { code: 'GBP', name: 'British Pound' },
        { code: 'AUD', name: 'Australian Dollar' },
    ]

    const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        if (!selectedCurrencies.includes(value) && value !== "") {

            setSelectedCurrencies(value);
            event.target.value = "";
        }
      
    };

    useEffect (() => {
        const fetchExchangeRates = async () => {

            //Check if the data is already in localstorage and if it's less than 24 hours old
            const storedData = localStorage.getItem('exchangeRates');
            const storedTime = localStorage.getItem('exchangeRatesTime');
            const apiKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

            if (storedData && storedTime) {
                const currentTime = new Date().getTime();
                const timeElapsed = currentTime - Number(storedTime);

                //If data is less than 24 hours old, use the stored data
                if (timeElapsed < 24 * 60 * 60 * 1000) {
                    setExchangeRates(JSON.parse(storedData));
                    setLoading(false);
                    return;
                }
            }

            // If no data in local storage or it's older than 24 hours, fetch new data
            try {
                setLoading(true);
                const response = await fetch(
                    `http://cors-anywhere.herokuapp.com/http://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`
                )
                
                
                const data = await response.json();
                
                if (data.result === "success") {
                    setExchangeRates(data.conversion_rates);
                    localStorage.setItem('exchangeRates', JSON.stringify(data.conversion_rates));
                    localStorage.setItem('exchangeRatesTime', new Date().getTime().toString());
                } else {
                    setError('Failed to fetch exchange rates')
                }
            } catch (error) {
                console.error('An error occurred while fetching exchange rates', error);
            } finally {
                setLoading(false);
            }
        };
        fetchExchangeRates();
    },[selectedCurrencies]);

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

  return (

    <div className='w-full max-w-xl mt-2 bg-white rounded-lg shadow-md'>
        <div className='p-1 border-b border-gray-100'>
            <div className='flex items-center space-x-2'>
                <ArrowRightLeft className='h-5 w-5 ml-1 text-blue-600' />
                <h2 className='text-md text-gray-600 font-semibold'>Currency Exchange Rates</h2>
            </div>
        </div>
        
        <div className='p-4'>
            <div className='mb-6'>
                <label htmlFor="currency" className='block text-sm font-medium text-gray-700 mb-2'>Add Currency to compare</label>
                    <select
                        id="currency"
                        value={selectedCurrencies}
                        onChange={handleCurrencyChange}
                        className="w-full max-w-xs px-3 py-2 bg-white border border-gray-300
                        rounded-lg shadow-sm focus:outline-none focus:ring-2 
                        focus:ring-blue-500 focus:border-blue-500"
                        >
                        <option value="">Select currency</option>
                        {currencies.map((currency) => (
                            !selectedCurrencies.includes(currency.code) && (
                                <option key={currency.code} value={currency.code}>
                                    {currency.code} - {currency.name}
                                </option>
                            )
                        ))}
                    </select>
            </div>
            <div className='flex items-center justify-between mb-2 p-2 bg-gray-50 rounded-lg shadow-md'>
                <div className='flex items-center space-x-3'>
                    <Banknote  className='h-5 w-5 text-blue-600'/>
                    <div>
                        <span className='text-xs font-semibold text-gray-500'>USD:</span>
                        <span className='ml-2 font-semibold text-gray-600 text-lg'>
                            {exchangeRates ? '1.00' : 'Loading...'}
                        </span>
                    </div>
                </div>
            </div>
            <div className='space-y-1'>
                <div className='text-sm'>
                    <div className='flex flex-col text-lg font-semibold text-gray-600 bg-gray-50 shadow-md rounded-lg space-y-2'>
                        <div className='flex items-center space-x-3 mt-4 ml-1'>
                            <Banknote className='h-5 w-5 ml-1 text-blue-600' />
                            <span className='text-xs text-gray-500 font-semibold '>{selectedCurrencies}:</span>
                            <span className='ml-2 text-gray-600 mb-1'>
                                {exchangeRates ? exchangeRates[selectedCurrencies] : 'Loading...'}
                            </span>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CurrencyExchange

