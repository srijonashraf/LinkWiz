# LinkWiz - FREE URL SHORTENER

The main motivation of this project is to build a solution to mitigate the issue of large URL sending or parsing anywhere on the internet.

## Project Overview

LinkWiz is a URL shortener service which generates a unique `shortId` of 6 characters to each request for URL shortening, This unique identifier is securely stored in the database, serving as a reference to the original URL. It also ensures proper data security and validation of every input data.

## UI
![LinkWiz](./ui-design.png)

## Implementation

### Validation and URL Generations 

Used `nanoId` for generating `shortId` and `Joi` for schema validation.

- **Ensure the Uniqueness**:
  If the  `shortId` is already used then it will regenerate the id again and which will maintain the uniqueness of the short url.

## To Get Started

1. Clone this repository:

   ```bash
   git clone https://github.com/srijonashraf/LinkWiz.git
   ```

2. Install all dependencies and run the servers:

   ```bash
   cd backend
   npm i
   node index.js
   cd ../frontend
   npm i
   npx vite
   ```


## API Documentation

https://documenter.getpostman.com/view/28939375/2sA3duEsiS
