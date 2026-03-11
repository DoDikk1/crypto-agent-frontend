import { useState, useEffect } from 'react';

interface Trade {
  id: number;
  date: string;
  symbol: string;
  type: 'Покупка' | 'Продажа';
  price: number;
  amount: number;
  total: number;
  profit?: number;
}

interface Props {
  coins: any[];
}

function TradeHistory({ coins }: Props) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTrades = async () => {
    setLoading(true);
    try {
      // Моковые данные для примера
      const mockTrades: Trade[] = [
        {
          id: 1,
          date: '2026-03-10 14:30',
          symbol: 'BTCUSDT',
          type: 'Покупка',
          price: 65400.50,
          amount: 0.5,
          total: 32700.25,
        },
        {
          id: 2,
          date: '2026-03-09 09:15',
          symbol: 'ETHUSDT',
          type: 'Покупка',
          price: 3450.20,
          amount: 2.0,
          total: 6900.40,
        }
      ];
      
      setTimeout(() => setTrades(mockTrades), 500);
    } catch (error) {
      console.error('Ошибка загрузки истории:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const styles = {
    container: {
      marginTop: '20px',
      background: '#1a1a1a',
      borderRadius: '12px',
      border: '1px solid #333',
      overflow: 'hidden',
    },
    header: {
      padding: '16px',
      background: '#242424',
      borderBottom: '1px solid #333',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      color: '#f0b90b',
      fontSize: '20px',
      margin: 0,
    },
    stats: {
      color: '#888',
      fontSize: '14px',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const,
    },
    th: {
      textAlign: 'left' as const,
      padding: '12px 16px',
      background: '#1f1f1f',
      color: '#888',
      fontSize: '12px',
      fontWeight: 'normal' as const,
      borderBottom: '1px solid #333',
    },
    td: {
      padding: '12px 16px',
      color: '#fff',
      borderBottom: '1px solid #333',
      fontSize: '14px',
    },
    buyType: {
      color: '#4caf50',
      background: 'rgba(76, 175, 80, 0.1)',
      padding: '4px 8px',
      borderRadius: '20px',
      fontSize: '12px',
      display: 'inline-block',
    },
    sellType: {
      color: '#f44336',
      background: 'rgba(244, 67, 54, 0.1)',
      padding: '4px 8px',
      borderRadius: '20px',
      fontSize: '12px',
      display: 'inline-block',
    },
    loadingContainer: {
      padding: '40px',
      textAlign: 'center' as const,
      color: '#888',
    },
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          Загрузка истории сделок... 📜
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>📜 История сделок</h3>
        <span style={styles.stats}>Всего: {trades.length}</span>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Дата</th>
              <th style={styles.th}>Монета</th>
              <th style={styles.th}>Тип</th>
              <th style={styles.th}>Цена</th>
              <th style={styles.th}>Кол-во</th>
              <th style={styles.th}>Сумма</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((trade) => (
              <tr key={trade.id}>
                <td style={styles.td}>{formatDate(trade.date)}</td>
                <td style={styles.td}>{trade.symbol.replace('USDT', '')}</td>
                <td style={styles.td}>
                  <span style={trade.type === 'Покупка' ? styles.buyType : styles.sellType}>
                    {trade.type}
                  </span>
                </td>
                <td style={styles.td}>${trade.price.toLocaleString()}</td>
                <td style={styles.td}>{trade.amount}</td>
                <td style={styles.td}>${trade.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TradeHistory;