# Awesome Links

## Quick Start

Make sure to have Node (v16) and Yarn installed

Install dependencies
```
yarn install
```

Next create a .env file and set the following Env variables
```
DATABASE_URL=//enter postgres db url connection
```

If running a local postgres instance, run this command to insert data into the DB
```
npx prisma db seed
```

```
npx ngrok http 3000
```

```
yarn dev
```


### DB


Whenever a change to the schema is made, make sure to run
```
yarn generate
```
This will generate all the prisma functions as well as types and hooks for any front end graphql queries

To open up a DB analyzer, run
```
npx prisma studio
```
