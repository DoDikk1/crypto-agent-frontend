import { useEffect, useState } from 'react';
import RiskAnalysis from './components/RiskAnalysis';
import TradeHistory from './components/TradeHistory';

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
  const [activeTab, setActiveTab] = useState<'portfolio' | 'risk' | 'history'>('portfolio');

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

// Автообновление каждые 30 секунд
useEffect(() => {
  const interval = setInterval(() => {
    fetchPortfolio();
  }, 30000); // 30 секунд

  return () => clearInterval(interval); // очистка при размонтировании
}, []);

  // Форматтер для чисел
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Стили для тёмной темы
  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#0a0a0a',
      minHeight: '100vh',
      color: '#ffffff',
    },
    header: {
      color: '#f0b90b',
      fontSize: '28px',
      marginBottom: '20px',
      textAlign: 'center' as const,
    },
    totalCard: {
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      padding: '20px',
      borderRadius: '16px',
      marginBottom: '20px',
      border: '1px solid #333',
      boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
    },
    totalLabel: {
      color: '#888',
      fontSize: '14px',
      marginBottom: '5px',
    },
    totalValue: {
      color: '#f0b90b',
      fontSize: '32px',
      fontWeight: 'bold' as const,
    },
    coinCard: {
      background: '#1a1a1a',
      padding: '16px',
      margin: '12px 0',
      borderRadius: '12px',
      border: '1px solid #333',
      transition: 'transform 0.2s',
      cursor: 'pointer',
    },
    coinHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
    },
    coinSymbol: {
      fontSize: '18px',
      fontWeight: 'bold' as const,
      color: '#fff',
    },
    coinChange: (change: number) => ({
      color: change >= 0 ? '#4caf50' : '#f44336',
      fontWeight: 'bold' as const,
      padding: '4px 8px',
      borderRadius: '20px',
      background: change >= 0 ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
    }),
    coinDetails: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '10px',
      color: '#888',
      fontSize: '14px',
    },
    coinDetailValue: {
      color: '#fff',
      fontWeight: '500' as const,
    },
    button: {
      background: '#f0b90b',
      color: '#000',
      border: 'none',
      padding: '14px 20px',
      fontSize: '16px',
      fontWeight: 'bold' as const,
      borderRadius: '12px',
      marginTop: '20px',
      width: '100%',
      cursor: 'pointer',
      transition: 'opacity 0.2s',
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
      color: '#888',
    },
    tabContainer: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px',
    },
    tabButton: (active: boolean) => ({
      flex: 1,
      padding: '10px',
      background: active ? '#f0b90b' : '#333',
      color: active ? '#000' : '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 'bold' as const,
    }),
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div>Загрузка портфеля... 📊</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>🚀 Крипто-агент</h1>
      
      {/* Вкладки */}
      <div style={styles.tabContainer}>
        <button
          onClick={() => setActiveTab('portfolio')}
          style={styles.tabButton(activeTab === 'portfolio')}
        >
          📂 Портфель
        </button>
        <button
          onClick={() => setActiveTab('risk')}
          style={styles.tabButton(activeTab === 'risk')}
        >
          📊 Риски
        </button>
        <button
          onClick={() => setActiveTab('history')}
          style={styles.tabButton(activeTab === 'history')}
        >
          📜 История
        </button>
      </div>

      {/* Общая стоимость (показываем только в портфеле) */}
      {activeTab === 'portfolio' && (
        <div style={styles.totalCard}>
          <div style={styles.totalLabel}>Общая стоимость портфеля</div>
          <div style={styles.totalValue}>
            ${formatCurrency(totalUsd)}
          </div>
        </div>
      )}

      {/* Контент в зависимости от вкладки */}
      {activeTab === 'risk' ? (
        <RiskAnalysis coins={coins} />
      ) : activeTab === 'history' ? (
        <TradeHistory coins={coins} />
      ) : (
        <>
          {coins.map((coin) => (
            <div 
              key={coin.symbol} 
              style={styles.coinCard}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={styles.coinHeader}>
                <span style={styles.coinSymbol}>{coin.symbol.replace('USDT', '')}</span>
                <span style={styles.coinChange(coin.change)}>
                  {coin.change > 0 ? '+' : ''}{coin.change}%
                </span>
              </div>
              
              <div style={styles.coinDetails}>
                <div>
                  <div>Количество</div>
                  <div style={styles.coinDetailValue}>{coin.amount.toFixed(4)}</div>
                </div>
                <div>
                  <div>Цена</div>
                  <div style={styles.coinDetailValue}>
                    ${formatCurrency(coin.price)}
                  </div>
                </div>
                <div>
                  <div>Стоимость</div>
                  <div style={styles.coinDetailValue}>
                    ${formatCurrency(coin.amount * coin.price)}
                  </div>
                </div>
                <div>
                  <div>Доля</div>
                  <div style={styles.coinDetailValue}>
                    {((coin.amount * coin.price / totalUsd) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button 
            onClick={fetchPortfolio} 
            style={styles.button}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            🔄 Обновить цены
          </button>
        </>
      )}
    </div>
  );
}

export default App;