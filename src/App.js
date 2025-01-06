import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import { fetchGoods } from './services/goodsService';

function App() {
  const [goods, setGoods] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
      const getGoods = async () => {
          try {
              const data = await fetchGoods();
              setGoods(data._embedded.goodEntityList);
          } catch (error) {
              setError('Error fetching goods' + error);
          }
      };

      getGoods();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h1>Goods</h1>
            {error && <div>{error}</div>}
            <ul>
                {goods.map(good => (
                    <li key={good.id}>Товар {good.name} с id={good.id} стоит {good.cost}</li>
                ))}
            </ul>
      </header>
    </div>
  
  );
}

export default App;
