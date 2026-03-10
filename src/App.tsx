import { useEffect, useState } from 'react';
import { AppRoot, Section, Cell, Button, Spinner } from '@telegram-apps/telegram-ui';

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalUsd, setTotalUsd] = useState(0);

  // VITE переменные
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
    <AppRoot>
      <div style={{ padding: '20px' }}>
        <Section header="💰 Крипто-агент">
          <Cell>
            <strong>Общая стоимость:</strong> ${totalUsd.toFixed(2)}
          </Cell>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Spinner size="m" />
            </div>
          ) : (
            coins.map((coin) => (
              <Cell
                key={coin.symbol}
                after={
                  <span style={{ color: coin.change >= 0 ? 'green' : 'red' }}>
                    {coin.change > 0 ? '+' : ''}{coin.change}%
                  </span>
                }
              >
                {coin.symbol.replace('USDT', '')}: {coin.amount} шт.
                <br />
                <small>${coin.price.toFixed(2)}</small>
              </Cell>
            ))
          )}
          
          <Button mode="filled" onClick={fetchPortfolio} style={{ marginTop: '20px' }}>
            🔄 Обновить цены
          </Button>
        </Section>
      </div>
    </AppRoot>
  );
}

export default App;