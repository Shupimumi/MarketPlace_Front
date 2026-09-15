import './App.css';
import React, {useEffect, useState} from 'react';
import { fetchGoods } from './services/goodsService';
import { useKeycloak } from '@react-keycloak/web';

function App() {
  const { keycloak, initialized } = useKeycloak();
  const [goods, setGoods] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialized && keycloak.authenticated) {
      const getGoods = async () => {
          try {
              const data = await fetchGoods();
              setGoods(data._embedded.goodEntityList);
          } catch (error) {
              setError('Error fetching goods' + error.message);
          }
      };

      getGoods();
    }
  }, [initialized, keycloak.authenticated]);

  if (!initialized) {
    return <div>Loading...</div>;
  }

  if (!keycloak.authenticated) {
    return (
      <div>
        <button onClick={() => keycloak.login()}>Login</button>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Goods</h1>
        {error && <div>{error}</div>}
        <ul>
          {goods.map((good) => (
            <li key={good.id}>
              Товар {good.name} с id={good.id} стоит {good.cost}
            </li>
          ))}
        </ul>
        <button onClick={() => keycloak.logout()}>Logout</button>
      </header>
    </div>
  
  );
}

export default App;
