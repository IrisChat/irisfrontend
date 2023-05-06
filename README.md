# Ether — Frontend
_It's a social app_


The main frontend for [SkiesUwU/Iris](https://github.com/SkiesUwU/Iris). Pair this along with [EtherComm/Ether](https://github.com/EtherComm/Ether)

<!-- ![image](https://user-images.githubusercontent.com/34188635/210490708-1b44da76-6e9d-451b-8aa7-1e2b3328e1ed.png) -->
![image](https://user-images.githubusercontent.com/34188635/219129242-2d64aec6-641f-4f4f-af12-b4b8323e5624.png)

## Running the frontend (Requires [Running the server](#running-the-server) to be completed first)
Next, open a new terminal and navigate to the frontend folder `etherfrontend`

Enter the following commands:

```shell
$ npm install && npm run dev
```

Now, point your browser to `https://localhost:5173` and try creating an account.

## Running the server
Ether can be accessed [online](https://iris-frontend.fly.dev).

To run Ether locally, make sure you have [Node.JS](https://nodejs.org/en/) and [MongoDB Community Server](https://www.mongodb.com/try/download/community) preinstalled.

1. Create an empty and load your CLI
2. Clone the frontend and backend separately

```shell
$ git clone https://github.com/EtherComm/Ether
$ git clone https://github.com/EtherComm/etherfrontend

```

3. `cd` into the backend folder `Ether` and run

```shell
$ npm install

```

4. Afterward, run the server using `npm start`

If everything works, the server output should read `Iris:Server running on port [8080]`
