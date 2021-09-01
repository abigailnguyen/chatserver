```bash
npx tsc --init
npm init -y
npm add nodemon dotenv -D
npm add express mongoose socket.io colors cors
npm install @types/dotenv @types/express @types/cors @types/colors
```

Note: these are devDependencies, that's why we use -D flag because we don't need them for more than development

1. `nodemon` for hot running
2. `dotenv` for `.env` configuration
3. `babel` for bundling
4. `express` to setup our server
5. `mongoose` to connect to our mongodb
6. `socket.io` the one responsible for realtime connection

To start the server

```bash
npm run dev
```

Create a react frontend

```bash
npx create-react-app chatfrontend
cd chatfrontend
npm i node-sass react-redux react-router-dom redux socket.io-client aes256
```
