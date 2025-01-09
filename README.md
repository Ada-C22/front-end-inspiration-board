
# Vision Board Front-End

This project is a front-end application for managing vision boards. It is built using React and Vite, and it interacts with a backend API to fetch and manage data.

## Features

- **Board List**: Displays a list of vision boards.
- **Active Board**: Shows the details of the selected board, including its cards.
- **Add Card**: Allows users to add new cards to the active board.
- **Sort Cards**: Users can sort cards by ID, likes, or alphabetically.

## Components

### `BoardList`

Displays a list of vision boards. It uses the `BoardList` component from [`src/components/BoardList.jsx`](src/components/BoardList.jsx).

### `ActiveBoard`

Shows the details of the selected board, including its cards. It uses the `ActiveBoard` component from [`src/components/ActiveBoard.jsx`](src/components/ActiveBoard.jsx).

### `CardForm`

Allows users to add new cards to the active board. It uses the `CardForm` component from [`src/components/CardForm.jsx`](src/components/CardForm.jsx).

### `Card`

Displays individual cards within the active board. It uses the `Card` component from [`src/components/Card.jsx`](src/components/Card.jsx).

## API Integration

The project interacts with a backend API to fetch and manage data. The API endpoints are defined in the `App.jsx` file:

- **Get Boards**: Fetches the list of boards from the API.
- **Get Active Board**: Fetches the details of the active board, including its cards.
- **Add Card**: Adds a new card to the active board.

## Running the Project

To run the project locally, follow these steps:

1. Install dependencies:

   ```sh
   npm install
   ```

2. Start the development server:

   ```sh
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`.

## Building the Project

To build the project for production, run:

```sh
npm run build
```

## Linting

To lint the project, run:

```sh
npm run lint
```

## Dependencies

- React
- Axios
- Vite

## Dev Dependencies

- ESLint
- @vitejs/plugin-react

## Environment Variables

The project uses the following environment variables:

- `VITE_APP_BACKEND_URL`: The URL of the backend API.

## License

This project is licensed under the MIT License.
```

This README document provides an overview of the front-end capabilities of your project, including its features, structure, components, API integration, and instructions for running, building, and linting the project.


## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
