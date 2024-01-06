# Bean Bazaar 

## Project Overview

This is app created for coffee enthusiasts that helps to discover, browse, compare coffee beans. 
Using web scraping techniques, I've integrated data from different online coffee shops, 
providing users with a comprehensive selection of coffee beans, including details like origin, flavor profiles, new arrivals. 
User can explore a wide range of coffee beans from various sources, all in one place.

## Project Structure

The project is divided into two main directories: client and server.

### Client Directory
The client directory contains the React application. The structure includes:

* src: The main source code directory.
* api: Contains the API service for making HTTP requests.
* assets: Stores files such images.
* config: Contains Firebase configuration.
* constant: constants for the live API endpoint.
* context: React context for managing global state.
* components: Contains all the React components.
* .env: Contains Firebase configuration.
* index.js: The entry point of the React application.
* pages: Components representing distinct pages in the application.
* reactQueryHooks: React Query hooks for handling data fetching and state management.
* styles: Contains SCSS files for styling the components.
* utils: Utility functions and helper modules for general application use.


### Server Directory

* config: Contains Firebase Admin and Mongodb configuration.
* controllers: Contains modules that handle the application's business logic, processing requests from routes.
* middleware: Functions that intercept and process HTTP requests before reaching the route handlers.
* models: Defines data models or schemas used to interact with the database.
* routes: Define API routes, specifying how the server should respond to various requests.
* scrapers: Functions responsible for web scraping.
* services: Contains logic that may be shared across controllers.
* utils: Utility functions and helpers.
* index.js: Entry point for the server.
* .env: Contains Firebase AdminSDK, Mongodb and Nodemailer

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
  npm client
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

* In the server/.env file, update the MONGODB_URI variable with your MongoDB connection string. Replace <password> with the password of the database user you just created.

### Firebase

* Go to the Firebase console and sign up for a new account.

* Click on "Create a project". Give your project a name and click on "Continue".

* Follow the prompts to configure your project. You can leave the default settings for now.

* After creating the project, you will be redirected to the project dashboard. Click on "Develop" in the left sidebar and then on "Database".

* Choose "Start in test mode" and enable the "Enable Firestore" switch.

* Navigate to the "Project settings" by clicking on the gear icon next to "Project Overview" and select "Service accounts".

* Click on "Generate new private key". This will download a JSON file containing your Firebase Admin SDK credentials. Keep this file safe as it contains sensitive information.

* In the server/.env file, update the FIREBASE_ADMIN_SDK variable with the content of the downloaded JSON file converted into a JSON string.

* On the client side, navigate to the Firebase console, click on "Project settings", then "Your apps", and select your app. In the "Firebase SDK snippet" section, select "Config". Copy the generated code and paste it into your client/.env file, replacing VITE_APP_FIREBASE_API_KEY, VITE_FIREBASE_AUTH_DOMAIN, VITE_FIREBASE_PROJECT_ID, VITE_FIREBASE_STORAGE_BUCKET, VITE_FIREBASE_MESSAGING_SENDER_ID, and VITE_FIREBASE_APP_ID with the corresponding values from the copied code.

## License

This project is licensed under the MIT License.




