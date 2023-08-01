
### Installation

Follow these steps to install the project:

1. **Clone the repository to your local machine:**
   ```bash
   git clone git@github.com:renehauck/lekkercode.git
   ```

2. **Navigate to the server directory:**
   ```bash
   cd my-express-server
   ```

3. **Install the dependencies:**
   ```bash
   yarn install
   ```

### Usage

Here are some commands you can use:

- **To start the server in development mode:**
  ```bash
  yarn start
  ```
  The server will be started on port 3000 and will automatically recompile and restart upon changes to the source code.

- **To run the tests:**
  ```bash
  yarn test
  ```

- **To compile the TypeScript code to JavaScript:**
  ```bash
  yarn build
  ```

- **To build the Docker image:**
  ```bash
  yarn docker-build
  ```

- **To run the application in a Docker container:**
  ```bash
  yarn docker-run
  ```

- **To start the application using Docker Compose:**
  ```bash
  yarn docker-compose
  ```

### Note on `.env` file

The `.env` file is presented in the repository but must be added to the `.gitignore` file in production.

### Production Changes

In production, I switched to the NestJS framework.

### Future Improvements

- Implementing end-to-end (e2e) tests would be interesting.
- Additional validation using Yup would be beneficial.
