# How to start this project?

- Add an .env file with database data
- Run one of the commands below to install dependencies:

  - ```bash
        yarn
    ```
  - ```bash
        npm i
    ```

- Run one of the commands below to run the migrations:

  - ```bash
        yarn migration:run
    ```
  - ```bash
        npm run migration:run
    ```

- Run one of the commands below to to seed your database:
  - ```bash
        yarn prisma db seed
    ```
  - ```bash
        npm run prisma db seed
    ```

### After this initial steps you just need to run the server using one of the commands below:

- ```bash
      yarn dev:server
  ```
- ```bash
      npm run dev:server
  ```

# How to insert a new migration?

- Run one of the commands below to insert the migrations:

  - ```bash
        yarn migration:insert [migration name]
    ```
  - ```bash
        npm run migration:insert [migration name]
    ```
