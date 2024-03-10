# Wordle 

## Live Demo

View the live demo [here](https://chris-pomeroy.github.io/wordle/)

Built using React with TypeScript

## Run using Docker

```
docker-compose up
```
Then view it in your web browser at [http://localhost:5173](http://localhost:5173)

Changes can be made to files the `src` and `public` folders, they will be kept in sync and will be hot reloaded by Vite

Remove from Docker afterwards using
```
docker-compose down --rmi all
```

## Or run using NPM

Node `v20.10.0` (npm `v10.2.3`)

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.\
You will also see any errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.\
See the [Vitest documentation](https://vitest.dev/guide/features.html) for more information.
