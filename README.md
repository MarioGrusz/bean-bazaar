# Bean Bazaar 

## Project Overview

This is app created for coffee enthusiasts that helps to discover, browse, compare coffee beans. 
Using web scraping techniques, I've integrated data from different online coffee shops, 
providing users with a comprehensive selection of coffee beans, including details like origin, flavor profiles, new arrivals. 
User can explore a wide range of coffee beans from various sources, all in one place.

## Features

### User Account Creation

Users can create their own accounts, allowing them to personalize their experience and save their preferences. The registration process is straightforward and secure, utilizing Firebase's authentication.

### Wishlist Functionality

Users have the ability to add specific items to their wishlist. This feature allows users to keep track of their favorite coffee beans and easily find them in the future.

### Weekly Scraped Items

Every week, the application automatically scrapes new data from various online coffee shops. This ensures that users always have access to the latest offerings, providing them with a fresh perspective on the world of coffee beans.

### New Arrivals Tag
New arrivals are marked with a 'new' tag, making it easy for users to spot what's new and exciting in the coffee bean market.

### Filtering and Sorting
The application is designed to be user-friendly, with intuitive navigation. Users can easily sort, search items and filter them by origin or roastery.

### UI/UX Design Principles
The application adheres to established UI/UX design principles to ensure a seamless and enjoyable user experience. The design is clean and uncluttered, with a focus on simplicity and ease of use. The color scheme is consistent and pleasing to the eye, and the layout is logical and intuitive.

## Live Demo
[Bean Bazaar](https://beanbazaar.netlify.app)

## Project Structure

The project is divided into two main directories: client and server.

### Client Directory
The client directory contains the React application. The structure includes:

```
📦 client
 ┣ 📂 src
 ┃ ┣ 📂 api
 ┃ ┣ 📂 assets
 ┃ ┣ 📂 config
 ┃ ┣ 📂 constants
 ┃ ┣ 📂 context
 ┃ ┣ 📂 components
 ┃ ┣ 📂 pages
 ┃ ┣ 📂 reactQueryHooks
 ┃ ┣ 📂 styles
 ┃ ┗ 📂 utils
 ┃ ┣ 📜 .env
 ┃ ┣ 📜 index.js
 ┗ 📜 README.md
```


### Server Directory
```
📦 server
┣ 📂 config
┣ 📂 controllers
┣ 📂 middleware
┣ 📂 models
┣ 📂 routes
┣ 📂 scrapers
┣ 📂 services
┣ 📂 utils
┣ 📜 index.js
┣ 📜 .env
```


## Technologies Used

[![Vite](https://img.shields.io/badge/Vite-blue?style=flat&logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-blue?style=flat&logo=react)](https://reactjs.org/)
[![React Router](https://img.shields.io/badge/React_Router-blue?style=flat&logo=react-router)](https://reactrouter.com/)
[![React Query](https://img.shields.io/badge/React_Query-blue?style=flat&logo=react-query)](https://react-query.tanstack.com/)
[![Firebase](https://img.shields.io/badge/Firebase-blue?style=flat&logo=firebase)](https://firebase.google.com/)

[![Node.js](https://img.shields.io/badge/Node.js-brightgreen?style=flat&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-brightgreen?style=flat&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-brightgreen?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-brightgreen?style=flat&logo=mongoose)](https://mongoosejs.com/)
[![Firebase Admin](https://img.shields.io/badge/Firebase_Admin-brightgreen?style=flat&logo=firebase)](https://firebase.google.com/)
[![Puppeteer](https://img.shields.io/badge/Puppeteer-brightgreen?style=flat&logo=puppeteer)](https://pptr.dev/)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-brightgreen?style=flat&logo=nodemailer)](https://nodemailer.com/)


## Deployment

The application is deployed on Netlify and Railway.

## How to Clone and Run the Project

Clone the project

```bash
  git clone https://github.com/MarioGrusz/coffee-beans-searcher.git
```

Install dependencies

Server

```bash
  cd server
```

```bash
  npm install
```

Client 

```bash
  cd client
```

```bash
  npm install
```

Run the Project

Server

```bash
  npm start
```

Client

```bash
  npm run dev
```

## Setting Up Accounts on MongoDB and Firebase
To successfully run this project, you need to create accounts on MongoDB and Firebase. Here are the steps to follow:

### MongoDB

* Go to the MongoDB Atlas website and sign up for a new account.

* After signing up, create a new cluster. You can choose the free tier for development purpose.

* Set IP address to allow connections from everywhere.

* Create a new database user with a username and password. Note down the credentials as you will need them later to connect your application to MongoDB.

* In the server/.env file, update the MONGODB_URL variable with your MongoDB connection string. Replace <password> with the password of the database user you just created.

### Firebase

* Go to the Firebase console and sign up for a new account.

* Click on "Create a project". Give your project a name and click on "Continue".

* Follow the prompts to configure your project. You can leave the default settings for now.

* After creating the project, you will be redirected to the project dashboard. Click on "Develop" in the left sidebar and then on "Database".

* Choose "Start in test mode" and enable the "Enable Firestore" switch.

* Navigate to the "Project settings" by clicking on the gear icon next to "Project Overview" and select "Service accounts".

* Click on "Generate new private key". This will download a JSON file containing your Firebase Admin SDK credentials. Keep this file safe as it contains sensitive information.

* In the server/.env file, update the FIREBASE_ADMIN_SDK variable with the content of the downloaded JSON file converted into a JSON string.

* Then client side, navigate to the Firebase console, click on "Project settings", then "Your apps", and select your app. In the "Firebase SDK snippet" section, select "Config". Copy the generated code and paste it into your client/.env file, replacing VITE_APP_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_STORAGE_BUCKET, VITE_FIREBASE_MESSAGING_SENDER_ID, and VITE_FIREBASE_APP_ID with the corresponding values from the copied code.

## License

This project is licensed under the MIT License.




