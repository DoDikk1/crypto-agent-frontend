import { useEffect, useState } from 'react';

// 1. СОЗДАЁМ ИНТЕРФЕЙС ДЛЯ МОНЕТЫ
interface Coin {
  symbol: string;
  price: number;
  amount: number;
  total_value: number;
  change: number;
}

function App() {
  // 2. УКАЗЫВАЕМ ТИП ДЛЯ useState
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalUsd, setTotalUsd] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL || 'https://crypto-agent-api.onrender.com';
  const USER_ID = '8437583351';

  const fetchPortfolio = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/portfolio/${USER_ID}`);
      const data = await response.json();

      if (data.success && Array.isArray(data.coins)) {
        setCoins(data.coins);
        setTotalUsd(data.total_usd);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1>💰 Крипто-агент</h1>
      
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <>
          <h2>Общая стоимость: ${totalUsd.toFixed(2)}</h2>
          
          {coins.map((coin) => (
            <div key={coin.symbol} style={{ 
              padding: '10px', 
              margin: '10px 0', 
              border: '1px solid #ccc', 
              borderRadius: '8px' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{coin.symbol.replace('USDT', '')}</strong>
                <span style={{ color: coin.change >= 0 ? 'green' : 'red' }}>
                  {coin.change > 0 ? '+' : ''}{coin.change}%
                </span>
              </div>
              <div>{coin.amount} шт. по ${coin.price?.toFixed(2) || '0.00'}</div>
              <div>💰 ${(coin.amount * coin.price).toFixed(2)}</div>
            </div>
          ))}
          
          <button onClick={fetchPortfolio} style={{
            padding: '10px 20px',
            fontSize: '16px',
            marginTop: '20px',
            width: '100%'
          }}>
            🔄 Обновить цены
          </button>
        </>
      )}
    </div>
  );
}

export default App;