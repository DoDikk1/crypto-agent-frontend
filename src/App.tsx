import { useEffect, useState } from 'react';
import '@telegram-apps/telegram-ui/dist/styles.css';
import { AppRoot, Section, Cell, Button, Spinner } from '@telegram-apps/telegram-ui';

interface Coin {
  symbol: string;
  price: number;
  amount: number;
  total_value: number;
  change: number;
}

function App() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalUsd, setTotalUsd] = useState(0);

  const fetchPortfolio = async () => {
    setLoading(true);
    try {
      // 🔥 РЕАЛЬНЫЙ ЗАПРОС К ТВОЕМУ API
      const response = await fetch('http://localhost:5000/portfolio/12345');
      const data = await response.json();
      
      if (data.success) {
        setCoins(data.coins);
        setTotalUsd(data.total_usd);
      } else {
        console.error('Ошибка API:', data.error);
      }
    } catch (error) {
      console.error('Ошибка загрузки портфеля:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <AppRoot appearance="dark" platform="base">
      <div style={{ 
        padding: '16px', 
        backgroundColor: 'var(--tg-theme-bg-color, #1a1a1a)',
        minHeight: '100vh',
        color: 'var(--tg-theme-text-color, #ffffff)'
      }}>
        {/* Шапка */}
        <Section header="🚀 Крипто-агент" style={{ backgroundColor: 'transparent' }}>
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <h1 style={{ margin: 0, fontSize: '28px', color: '#00ff88' }}>
              ${formatPrice(totalUsd)}
            </h1>
            <p style={{ margin: '4px 0 0', color: 'var(--tg-theme-hint-color, #888)' }}>
              Общая стоимость портфеля
            </p>
          </div>
        </Section>

        {/* Кнопка обновления */}
        <div style={{ margin: '16px 0' }}>
          <Button
            onClick={fetchPortfolio}
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? <Spinner size="s" /> : '🔄 Обновить'}
          </Button>
        </div>

        {/* Список монет */}
        <Section header="📂 Мой портфель" style={{ backgroundColor: 'transparent' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '32px' }}>
              <Spinner size="l" />
            </div>
          ) : (
            coins.map((coin) => (
              <Cell
                key={coin.symbol}
                subtitle={
                  <>
                    {coin.amount} × ${formatPrice(coin.price)} = ${formatPrice(coin.total_value)}
                    <br />
                    <span style={{ color: coin.change > 0 ? '#4caf50' : '#f44336' }}>
                      {coin.change > 0 ? '🟢' : '🔴'} {coin.change > 0 ? '+' : ''}{coin.change}%
                    </span>
                  </>
                }
                after={null}
                style={{ backgroundColor: 'var(--tg-theme-secondary-bg-color, #2a2a2a)' }}
              >
                {coin.symbol.replace('USDT', '')}
              </Cell>
            ))
          )}
        </Section>

        {/* Кнопка обновления внизу */}
        {!loading && (
          <div style={{ margin: '16px 0' }}>
            <Button onClick={fetchPortfolio} style={{ width: '100%' }} mode="outline">
              🔄 Обновить цены
            </Button>
          </div>
        )}
      </div>
    </AppRoot>
  );
}

export default App;