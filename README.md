# Backend Application Bank Account NestJS

This is a sample project of bank account with the NestJS framework.

## Installation

1. Clone this repository to your local system:

```bash
git clone https://github.com/samuelsankys/Ripio-Trade.git
```

2. Navigate to the project directory:

```bash
cd Ripio-Trade
```

3. Install project dependencies:

```bash
npm install # or yarn install
```

## Running the Development Server

To start the development server, first make a copy of the `.env.example` file and rename it to `.env`. Modify the database access keys if you want to use your local database. If you don't have a database, you can create one by running:

```bash
docker-container up
```

If you don't have PostgreSQL installed, initialize the `docker-container` that will run a container with a database on port 5433.

- Create a database named `ripio`

- Run for create tables via migration:

```bash
npm run prisma:run-migrations
```

- Run the following command:

```bash
npm run start:dev # or yarn start:dev
```

This will start the development server at `http://localhost:3000`. You can access the root endpoint in your browser or using tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/).

## View the Documentation

After starting the development server, you can access the API documentation at `http://localhost:3000/api`.

## Running Tests

To run unit and integration tests, execute the following command:

```bash
npm run test # or yarn test
```

To run end-to-end (e2e) tests, execute the following command:

```bash
npm run test:e2e # or yarn test:e2e
```

## Note

Due to time constraints, I abstracted the implementation of some functionalities. They are:

- Generation of account number, agency, digit.
- Transaction status

## License

This project is licensed under the MIT License. See the LICENSE file for details.
