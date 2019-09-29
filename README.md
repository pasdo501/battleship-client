# Battleship

Client side code for a battleship app making use of websockets for communication between players.

Currently deployed using [Surge](https://surge.sh) at http://living-achieve.surge.sh.

_Note:_ If deploying on Surge, after running `yarn build`, make sure to rename the `index.html` file to `200.html` so Surge can handle it as a fallback and make sure the React router works.

See [README2](./README2.md) for CRA specific readme.

## Usage

- **Development:** Make sure the server (see below) is running locally, then run yarn start to run the development build at http://localhost:3000.
- **Production:** Run yarn build to create a production build.

---

## Server

See [this repo](https://github.com/pasdo501/battleship-server) for the server side code related to the app.
