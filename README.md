# Awesome Links

## Quick Start

Make sure to have Node (v16) and Yarn installed if not follow the next steps:

1. Install Brew

```
$ /bin/bash -c "$(curl -fsSL
https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. Install Node and Yarn

```
$ brew install node && brew install yarn
```

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

To have Auth0 hook into your local instance and create a new user in our database run,

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
