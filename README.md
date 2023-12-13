# MoneyMaster.

### Objective

this is project4 for NEU. I build a full stack application with Node + Express + Mongo + React (hooks). moneyMaster is a managing application for bank accounts which gives a use an opportunity to, manage all their credit cards all at one place. an user can create/delete/modify/view his bank accounts.

### Author

Createed by [Ali Saremi](https://github.com/s4remi)

### Color Palette

![Colo palette](./data/color%20palette.png)

### Fonts

I have decided that I need to express a delightful and modern feeling for my MoneyMaster application, I need to use a vivid and cheerful fonts. Among many sans-serif fonts, I have chosen 'Archivo' for headers and 'Open Sans' for paragraph font

### Usability Study Report

[MoneyMaster Usability Study Report by Ali Saremi](https://docs.google.com/document/d/1AIqcdRl-wnfN80I4XupIXk56O9NsTg4uHPIJM_oSDyA/edit?usp=sharing)<br>
[user case study 1](https://www.youtube.com/watch?v=J5P4DcqlsTc)<br>
[user case study 2](https://www.youtube.com/watch?v=X4G9sA-SX0o)<br>
[user case study 3-1,concent form](https://www.youtube.com/watch?v=BVu2nmdqYUo)<br>
[user case study 3-2 app intraction](https://www.youtube.com/watch?v=jaM5Ml-Fea0)<br>

### Slides & Video & Design Document & Deployment Link

[slides Here V2.0](https://docs.google.com/presentation/d/1vutD4xo3GU2k0lXprcuMneBcPIkr2KwSCDDq_WdG2Eo/edit?usp=sharing)

[Slides Here V1.0](https://docs.google.com/presentation/d/1EPZiVV4H_JwtapBzgIOujojJo_Lgmi68OzKlkjXnTdI/edit?usp=sharing)

[Design Document](https://docs.google.com/document/d/1NktV_wv2bf1F0-Ayk9nscXADAFFRC8qYrTxc2s-lNAY/edit?usp=sharing)

## Demo V1.0

[![Demo](https://img.youtube.com/vi/LpvGg0Jy8AY/0.jpg)](https://www.youtube.com/watch?v=LpvGg0Jy8AY)

## Installation

To set up moneyMaster, you'll need the following:

Clone the repository: git@github.com:s4remi/moneyMaster.git

## Navigate to the root directory:

```
cd moneyMaster
```

## Install dependencies:

```
npm install
cd front
npm install
npm run build
cd..
npm start

```

## Dependencies: Back-end

```
"cookie-parser": "~1.4.4",
"crypto": "^1.0.1",
"debug": "~2.6.9",
"dotenv": "^16.3.1",
"express": "^4.18.2",
"express-session": "^1.17.3",
"mongodb": "^6.2.0",
"morgan": "~1.9.1",
"passport": "^0.6.0",
"passport-local": "^1.0.0"

```

## Dependencies: front-end

```
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.19.0"
  },
```

## Brief overview of the components:

### Server-Side (Node.js with Express):

    app.js: The main entry point for the server-side code. It sets up Express, defines middleware (such as logging, cookie parsing, and static file serving), configures sessions, and handles routing.

    routes/index.js: Defines routes for handling API requests related to data retrieval.

    routes/auth.js: Contains routes for user authentication (login, logout, signup).

    routes/bankAccs.js: Handles API requests related to banking accounts, including creation, updating, and deletion.

    myMongoDB.js: Connects to MongoDB and defines methods for interacting with the database, such as retrieving data, inserting users, and managing bank accounts.

### Client-Side (React):

    index.html: The main HTML file that includes the root element where the React app is mounted.

    index.css: Styles for the React app, including the ones you provided and additional styles.

    main.jsx: The main entry point for the client-side React code. It sets up routing and renders the root component.

    pages: Contains React components for different pages (DatasPage, AboutPage, LoginPage, EditPage).

### Authentication:

    Passport.js is used for authentication, specifically the LocalStrategy for username/password-based authentication.

### Database:

    MongoDB is used as the database, and the myMongoDB.js file contains functions for interacting with it.

### External Libraries:

    Bootstrap is included for styling in the HTML file.

## License

This project is licensed under the MIT license.
