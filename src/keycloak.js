import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:9090', // URL вашего Keycloak сервера
  realm: 'Oauth', // Ваш Realm
  clientId: 'myClient', // Client ID из Keycloak
});

export default keycloak;