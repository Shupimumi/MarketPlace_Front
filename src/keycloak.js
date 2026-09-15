import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:9090', // URL вашего Keycloak сервера
  realm: 'Oauth', // Ваш Realm
  // Public client (no secret) for the browser; `myClient` stays confidential for server-side use
  clientId: 'marketplace-front',
});

export default keycloak;