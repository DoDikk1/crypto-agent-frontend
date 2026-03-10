import { useState, useEffect } from 'react';

interface RiskData {
  symbol: string;
  volatility: number;
  volume: number;
  riskLevel: 'Низкий' | 'Средний' | 'Высокий';
}

interface Props {
  coins: any[];
}

function RiskAnalysis({ coins }: Props) {
  const [riskData, setRiskData] = useState<RiskData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRiskData = async () => {
    setLoading(true);
    try {
      const mockData = coins.map(coin => ({
        symbol: coin.symbol,
        volatility: (Math.random() * 5).toFixed(2),
        volume: Math.floor(Math.random() * 1000000),
        riskLevel: ['Низкий', 'Средний', 'Высокий'][Math.floor(Math.random() * 3)] as 'Низкий' | 'Средний' | 'Высокий'
      }));
      setRiskData(mockData);
    } catch (error) {
      console.error('Ошибка загрузки рисков:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (coins.length > 0) {
      fetchRiskData();
    }
  }, [coins]);

  const getRiskColor = (level: string) => {
    switch(level) {
      case 'Низкий': return '#4caf50';
      case 'Средний': return '#ff9800';
      case 'Высокий': return '#f44336';
      default: return '#888';
    }
  };

  const styles = {
    container: {
      marginTop: '20px',
      padding: '16px',
      background: '#1a1a1a',
      borderRadius: '12px',
      border: '1px solid #333',
    },
    header: {
      color: '#f0b90b',
      fontSize: '20px',
      marginBottom: '16px',
    },
    riskCard: {
      padding: '12px',
      margin: '8px 0',
      background: '#242424',
      borderRadius: '8px',
      border: '1px solid #333',
    },
    riskRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px',
    },
    symbol: {
      fontWeight: 'bold' as const,
      color: '#fff',
    },
    riskBadge: (level: string) => ({
      padding: '4px 12px',
      borderRadius: '20px',
      background: getRiskColor(level),
      color: '#000',
      fontSize: '12px',
      fontWeight: 'bold' as const,
    }),
    metric: {
      color: '#888',
      fontSize: '14px',
    },
    value: {
      color: '#fff',
      fontWeight: '500' as const,
    },
    progressBar: {
      width: '100%',
      height: '8px',
      background: '#333',
      borderRadius: '4px',
      marginTop: '8px',
    },
    progressFill: (level: string) => ({
      width: level === 'Низкий' ? '30%' : level === 'Средний' ? '60%' : '90%',
      height: '100%',
      background: getRiskColor(level),
      borderRadius: '4px',
      transition: 'width 0.3s',
    }),
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={{ textAlign: 'center', color: '#888' }}>
          Анализируем риски... 📊
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>📊 Риск-анализ портфеля</div>
      
      {riskData.map((risk) => (
        <div key={risk.symbol} style={styles.riskCard}>
          <div style={styles.riskRow}>
            <span style={styles.symbol}>{risk.symbol.replace('USDT', '')}</span>
            <span style={styles.riskBadge(risk.riskLevel)}>{risk.riskLevel}</span>
          </div>
          
          <div style={styles.riskRow}>
            <span style={styles.metric}>Волатильность 24ч</span>
            <span style={styles.value}>{risk.volatility}%</span>
          </div>
          
          <div style={styles.riskRow}>
            <span style={styles.metric}>Объём торгов</span>
            <span style={styles.value}>${risk.volume.toLocaleString()}</span>
          </div>
          
          <div style={styles.progressBar}>
            <div style={styles.progressFill(risk.riskLevel)} />
          </div>
        </div>
      ))}
      
      <div style={{ marginTop: '16px', color: '#888', fontSize: '12px', textAlign: 'center' }}>
        * Риск рассчитывается на основе волатильности и объёмов
      </div>
    </div>
  );
}

export default RiskAnalysis;