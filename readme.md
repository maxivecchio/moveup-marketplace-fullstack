# Moveup Marketplace Fullstack

- **Personal Profile Creation**: Enables users to create and customize their profiles with personal information.
- **Switch to Business Account**: Offers an option for users to switch their personal profiles to business accounts, providing access to additional business-oriented features.
- **Product Upload**: Users with business accounts can upload their products, including descriptions, prices, and images.
- **Product Management**: Allows for editing product details like price, description, and images, ensuring that the product listings are always up-to-date.
- **Product Deletion**: Gives the option to remove products from the marketplace, which is useful for discontinued items or out-of-stock products.

## Tech Stack

**Client:** ReactJs, TailwindCSS, NextUI, NotiStack.
**Server:** Node, Express, MongoDB, Mongoose

## Run Locally

Clone the project

```bash
git clone https://github.com/maxivecchio/moveup-marketplace-fullstack
```

## Run Server

- Install dependencies

```bash
cd server
npm install
```

- Environment Configuration

Please establish a .env file in the root directory with the following configurations:

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
