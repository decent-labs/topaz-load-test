# Topaz Load Test

This project exposes a function which assists in load testing Topaz.

## Developer Setup

Here's how to get up and running

### `.env` Setup

Make yourself a `.env` file

```bash
$ cp .env.example .env
```

Then update it.

Point `BASE_URL` at an instance of the Topaz API.

Add a valid `API_KEY`.

`NUMBER_OF_NEW_APPS` indicates how many new apps will be created when the script runs.

`REQUEST_CHUNK_SIZE` saves the networking system from overloading. Concurrent requests to the API will not exceed this number.

`MIN_APP_INTERVAL_S` indicates the minimum interval time, in seconds, that a new app might randomly be assigned.

`MAX_APP_INTERVAL_S` indicates the maximum interval time, in seconds, that a new app might randomly be assigned.

### GO!

Make sure your Topaz API is running, then

```bash
$ yarn start
```

-----

Made with 🖤 in:

* Cleveland, OH
