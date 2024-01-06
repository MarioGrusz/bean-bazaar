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
Install dependencies

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

