<<<<<<< HEAD
## Pré-requis

Il est nécessaire d'avoir un environnement de développement web tel que WAMP/XAMP.

### Première étape

Clonez le repository BilbioNode avec ```git clone https://github.com/Squalord/NodeJS```

### Deuxième étape

Installez les packages NPM avec 
```npm install```

### Troisième étape

Changez les propriétés de connexion à la BD dans le répertoire /server/manifest.js : 
```js
 host: process.env.DB_HOST || 'localhost',
 user: process.env.DB_USER || 'root',
 password: process.env.DB_PASSWORD || 'root',
 database: process.env.DB_DATABASE || 'nodejs',
```
## Démarrage

Lancez l'API avec la commande  ```npm start``` 

# iut-project

La partie Email ne fonctionne pas, le mieux est d'utiliser le commit "start Projet"
