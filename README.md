# reto-grupo-promass

![img](./img/portada.png) <!-- alt = img -thumbnail -->

- [backend](#backend)
- [frontend](#frontend)
- [How to deploy](#how-to-deploy)
  - [Docker](#docker)


### backend
## How to use

1. crea el archivo `.env` tomando de ejemplo `.env.example`,
2. conecta tu base de datos en postgres
3. usa node.js >= 18.15.0
4. Ejecuta el comando
```bash

# install dependencies
npm install
# Start the bot service
npm run dev

O

# install dependencies
yarn install
# Start the bot service
yarn dev
```
5. abre http://localhost:3001/api-docs/#/
6. registra tu usuario ejecutando el swagger http://localhost:3001/api-docs/#/Auth/post_auth_register
{
  "email": "usuario@example.com",
  "password": "password123"
}


### frontend
## How to use

1. conectate al backend por default en el puerto 3001
2. usa node.js >= 18.15.0
3. Ejecuta el comando
```bash

# install dependencies
npm install
# Start the bot service
npm run dev

O

# install dependencies
yarn install
# Start the bot service
yarn dev
```
4. haz login con tu usuario registrado 
"email": "usuario@example.com",
"password": "password123"

## How to deploy

### Docker

```bash
# Pull image
docker pull postgres

# Run
docker run --name postgres -e POSTGRES_PASSWORD=tu_contraseña -p 5432:5432 -d postgres

# add user
docker exec -it postgres psql -U postgres
```

## License

MIT © juanhoil