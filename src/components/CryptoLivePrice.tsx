import axios from 'axios';
import { useEffect, useState } from 'react'


interface CryptoLivePriceProps {
  symbol: string;
  price: number;
  change: number;
  image: string;
}

const CryptoLivePrice = () => {

    const [prices, setPrices] = useState<Record<string, CryptoLivePriceProps>>({
        BTCUSDT: { image: '', symbol: 'BTC', price: 0, change: 0 },
        ETHUSDT: { image: '', symbol: 'ETH', price: 0, change: 0 },
        BNBUSDT: { image: '', symbol: 'BNB', price: 0, change: 0 },
        SOLUSDT: { image: '', symbol: 'SOL', price: 0, change: 0 },
        XRPUSDT: { image: '', symbol: 'XRP', price: 0, change: 0 },
    })

    const fetchCryptoImages = async () => {
      try {
          const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
              params: {
                  vs_currency: 'usd',
                  ids: 'bitcoin,ethereum,solana,binancecoin,ripple',
              },
          });
          
          const imageMap: Record<string, string> = {};
          response.data.forEach((coin: any) => {
            const symbol = coin.symbol.toUpperCase();
            imageMap[symbol] = coin.image;
          });
          
          setPrices((prevPrices) => {
            const updatedPrices = { ...prevPrices };
            Object.keys(updatedPrices).forEach((key) => {
              updatedPrices[key] = { ...updatedPrices[key], image: imageMap[updatedPrices[key].symbol] };
            });
            return updatedPrices;
          });
      } catch(err) {
          console.log('Error fetching crypto images:', err);
      }
      
  };

    useEffect(() => {

      fetchCryptoImages();
      const symbols = ['btcusdt','ethusdt','solusdt','bnbusdt','xrpusdt'];
      const sockets = symbols.map((symbol) => {
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@trade`);
        ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          setPrices((prevPrices) => ({
            ...prevPrices,
            [symbol.toUpperCase()]: {
              ...prevPrices[symbol.toUpperCase()],
              price: parseFloat(data.p),
              change: prevPrices[symbol.toUpperCase()] 
              ? parseFloat(data.p) - prevPrices[symbol.toUpperCase()].price 
              : 0,
            },
          }));
        };
        return ws;
      });
      return () => {
        sockets.forEach((ws) => ws.close());
      }
    },[]);
    
  return (

    <div className='mt-2 p-4 bg-white rounded-lg shadow-md'>
      <h3 className='text-xl font-semibold mb-4 text-gray-600'>CryptoTracker</h3>
      <div className='space-y-2'>
        {Object.values(prices).map(({ symbol, price, change, image}) => (
          <div 
            key={symbol}
            className='flex items-center justify-between p-2 rounded-lg'
            style={{
              backgroundColor: change >= 0 ? '#e0ffe6' : '#ffe0e0',
              color: change >= 0 ? '#28a745' : '#dc3545',
            }}
            >
              <div className='flex items-center space-x-2'>
                <img src={image} alt={`${symbol} logo`} className='w-6 h-6' />
                <span className='text-lg font-semibold'>{symbol}</span>
              </div>
              <div>
                <span className='text-lg font-bold'>
                  ${price.toLocaleString(undefined,
                     { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
        ))}
      </div>
    </div>

  )
}

export default CryptoLivePrice