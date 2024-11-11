import { useEffect, useState } from 'react';
import axios from 'axios';

interface Item {
  id: number;
  name: string;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api/items') // プロキシ設定を利用してリクエスト
      .then(response => {
        setItems(response.data);
        setMessage('Data fetched successfully!');
      })
      .catch(error => {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        setMessage('Failed to fetch data.');
      });
  }, []);

  return (
    <div>
      <h1>{message}</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;