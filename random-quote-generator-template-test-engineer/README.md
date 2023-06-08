# Test Engineer Take-Home Interview: Random Quote Generator

## Introduction

Your task is to use [Cypress](https://www.cypress.io/) to write tests for a application that displays random The Office quotes.

The application is written using [NestJS](https://nestjs.com/), [TypeScript](https://www.typescriptlang.org/), [TypeORM](https://typeorm.io), and [SQLite](https://www.sqlite.org)

## Getting Started

Follow the README instructions below to get the quotes app up and running, and take a look at the code for it.
The [NestJS First Steps](https://docs.nestjs.com/first-steps) documents are a great launching point to begin understanding the application.

## What We Expect From You

1. Use Cypress to write comprehensive unit tests and end-to-end tests for the provided application. This application does not need to be deployed or hosted anywhere- just something you can run locally.
2. If you find any bugs in the application, please fix them and note down any changes you make.
3. Update the README with any information you want to include that will help us understand and run your project and the new tests.
4. Upload your completed code to your own github account and share it with us. If the repo is private please share it with `violet-hiring`.

## Need Help?

Feel free to consult any NestJS, TypeScript, or Cypress documentation necessary. For any other further questions or issues that arise, reach out to your hiring manager.

## Time Estimate

We expect this to take you 2-4 hours to complete. This isn’t a hard limit- it is just for you to plan your time!

## About this project

An application to randomly display a quote. The NestJs server uses an in-memory sqlite database.

This project is split into 3 separate packages:

```bash
.
├── packages
│   ├── client  # ReactJs application
│   ├── domain  # TypeScript library
│   ├── server  # NestJs api application
```

## Getting Started

### Prerequisites

- Node v16

```
npm install npm@latest -g
```

To install the dependencies and run the scripts it is recommended to use `yarn`

```
npm install --global yarn
```

### Installation

1. Install packages

   ```
   yarn
   ```

2. Build the domain library

   ```
   yarn build:domain
   ```

   This will build the domain library which contains a shared interface used in the `server` and `client` apps.

## Running the app

To run the application you need will need to start the api server and client application.

### Start the API Server

Open a terminal window and run the following command from the root of the project:

```
yarn start:server
```

![](https://i.imgur.com/I2Kelil.png)

This will start the NestJs application and seed the in-memory sqlite database with data from [office_quotes.json](./packages//server//src//seeds/office_quotes.json).

You can access the api from your browser or with postman at the following address http://localhost:3000/quote. Alternatively open a terminal window and use cURL

#### Random Quote

```
curl 'http://localhost:3000/quote' \
  -H 'Accept: */*' \
  -H 'Accept-Language: en-US,en;q=0.9'
```

#### Random Quote by 'Jim' or 'Pam'

```
curl 'http://localhost:3000/quote?characters=Jim,Pam' \
  -H 'Accept: */*' \
  -H 'Accept-Language: en-US,en;q=0.9'
```

### Start the client

Open annother terminal window to start the client application.

```
yarn start:client
```

![](https://i.imgur.com/qH6vBTM.png)

This will run the app in the development mode. Open http://localhost:4000 to view it in the browser. To display a different quote press the **Random Quote** button.

![](https://imgur.com/7uFZMaq.png)

## Errors & Issues

1. On loading the application, this error is shown in browser console:

  Warning: Pill: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)
  Pill@http://localhost:4000/src/components/Pill/index.tsx?t=1686089896996:18:6

  I updated packages/client/src/components/Pill/index.tsx to use the 'myKey' prop instead 

2. Removed "keyofStringsOnly": true, from tsconfig.base.json To resolve "Option 'keyofStringsOnly' is deprecated and will stop functioning in TypeScript 5.5. Specify compilerOption '"ignoreDeprecations": "5.0"' to silence this error.
To resolve Option 'keyofStringsOnly' is deprecated and will stop functioning in TypeScript 5.5."

3. My cypress tests initially didn't recognize 'cy', so I added in packages/domain/tsconfig.json “cypress” to “types”

4. I noticed that the characters can either be capitalized or not in office_quotes.json and that once you selected one of the character buttons, it will only ever fetch quotes from columns where the character value is in selectedCharacters AND the character value is all lowercase. I added the following code to packages/server/dist/repository.service.js to fix this:

        if (characters) {
            // need to consider capitalized and non-capitalized names
            const nonCapitalizedCharacters = characters.map((character ) => character.toLowerCase())
            const capitalizedCharacters = characters.map((character ) => character.charAt(0).toUpperCase() + character.slice(1))
            query.where('character IN(:...nonCapitalizedCharacters)', { nonCapitalizedCharacters }).orWhere('character IN(:...capitalizedCharacters)', { capitalizedCharacters })
        }

Could also be resolved by cleaning the data (i.e., make all character names capitalized or none)

## Tests
Here are the test file locations for the components:
packages/client/src/components/App/indexApp.cy.tsx
packages/client/src/components/CharacterList/indexCharacterList.cy.tsx
packages/client/src/components/Pill/indexPill.cy.tsx
packages/client/src/components/Quote/indexQuote.cy.tsx

And the e2e:
packages/client/cypress/e2e/theoffice.cy.ts

I initially went the route of adding the 'data-cy' identifer to character buttons in order to test those, then later considered the possibility that more/less characters could be added (hence why you'll see [data-cy=dwightButton] under indexApp.cy.tsx but a loop through buttons in the e2e test)

Biggest challenge that I unfortunately couldn't figure out was how to get the state of selectedCharacters. I tested the css change (background color) when clicking those buttons as well as testing quotes only from selected characters are generated (unless none are selected of course) but couldn't figure out how to test the changing state of the selectedCharacters array.

I have placed cy.wait() in a few places where I realized the tests ran too quickly and affected one another.

This was my first time using Cypress (and my typescript is pretty rusty) so I used Cypress's Launchpad to create and run tests "yarn run cypress open"
