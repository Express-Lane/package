# Quick-Lane for Node / Express Backends

## What is Quick-Lane?

Quick-Lane is a new workflow script that makes starting a new Node / Express app a breeze. This package will set you up with an Express Server ready to run that comes complete with JWT Authentication, User Routes, User Model, and SQLite3 Database out of the box.

## How do I run it?
The easiest way is start by creating a new directory for your project. to initialize the script, move inside the project directory and run either:

| `npx quick-lane --create-server`

or 

| `npx quick-lane -c`


 It will display it's progress through the terminal and print the script options once complete. You will be able to start the server with either:
 
 | `npm run server`
 
  or  
  
| `npm run start` 

If you wish to use this script regularly, you can install on it on your local machine globally via:

| `npm install quick-lane -g`

## How do I use the backend?

After we have ran one of the two start servers you are ready to experiment with what has been built for you. It comes with some basic routes to help you get started

### Register a User

- Endpoint: `url/api/auth/register`

- Requst: `POST`

- Expects: `{ "email": string, "password": string }`

- Returns: `{ "id": int, "email": string, "password": string* }`

*Password returned has been hashed

### Login a User

- Endpoint: `url/api/auth/Login`

- Request: `POST`

- Expects: `{ "email": string, "password": string }`

- Returns: `{ "id": int, "token": string, "message": string }`

### Get All Users

- Endpoint: `url/api/users/`

- Request: `GET`

- Returns: `[ { "id": int, "email": string, "password": string* }, ...users ]`

### Get User by Id

- Endpoint: `url/api/users/:id`

- Request: `GET`

- Returns: `{ "id": int, "email": string, "password": string }`


## What now?

Since you have saved yourself hours of boilerplating the app, now is the time to start building your awesome API! Customize the boilerplate as you see fit, and expand upon it to make your own ideas come to life!