import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
  date: string;
  value: number;
}

interface PortfolioChartProps {
  userId: number;
}

const PortfolioChart: React.FC<PortfolioChartProps> = ({ userId }) => {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`http://localhost:5000/history/${userId}`);
        const result = await response.json();
        
        if (result.success) {
          const chartData = result.history.map((item: any) => ({
            date: item.date,
            value: item.total_usd
          }));
          setData(chartData);
        }
      } catch (error) {
        console.error('Ошибка загрузки истории:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Загрузка графика...</div>;
  }

  if (data.length === 0) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Нет данных для графика</div>;
  }

  return (
    <div style={{ width: '100%', height: 300, marginTop: 20 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis 
            dataKey="date" 
            stroke="#888"
            tickFormatter={(str) => str.slice(5)}
          />
          <YAxis 
            stroke="#888"
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip 
            formatter={(value: any) => [`$${value.toLocaleString()}`, 'Стоимость']}
            labelFormatter={(label) => `Дата: ${label}`}
            contentStyle={{ backgroundColor: '#1a1a1a', borderColor: '#333' }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#00ff88" 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioChart;