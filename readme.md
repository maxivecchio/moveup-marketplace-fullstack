# Da Vinci: Hybrid Applications

Univeristy Task

## Features

- **API RESTful**
- **Router API**
- Get, Create, Update and Delete products, categories, users, and user shopping cart.
- **Authenticate** User with JsonWebToken -> _protected routes_
- Models, Controllers, Middlewares, Routes.

## Tech Stack

**Server:** Node, Express, MongoDB, Mongoose

## Run Locally

Clone the project

```bash
git clone https://github.com/maxivecchio/moveup-marketplace-fullstack
```

## Run Server

```bash
// default
cd server
```

Install dependencies

```bash
npm install
```

Environment Configuration

- Please establish a .env file in the root directory with the following configurations:

```bash
PORT=3022
JWT_SECRET=SDSAAKSKDAKDKSKDASKD
DB_MONGO_URL=mongodb+srv://admin:root@davinci.osgdagz.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp
```

_Note: The MongoDB Database URL provided is solely for educational purposes related to the "davinci" project. Ensure that you handle this information with care._

Start the server

```bash
node app.js
```

## Run Client

```bash
// default
cd client
```

Install dependencies

```bash
npm install
```

Starting the Website

```bash
npm run dev
```

## Support

For support, email hello@moveup.digital

## Authors

- [Maximiliano Vecchio](https://www.linkedin.com/in/maxivecchio)
- [Lourdes Martinez](https://github.com/luli-martinez)
- [Valeria Quintero](https://www.linkedin.com/in/valeria-quintero-b87b21229/)

Let's work together!

Thanks.
