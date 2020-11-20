
# Product Gallery Assignment 
Design and write a small program(Node.js and Mongo) to find total users and total unique users who viewed a product on daily/weekly/monthly/Custom date from the following collection.

```
UserId: String
ViewDate: Date
ProductId: String
```


It has million of documents in a collection name - userView and it gets populated whenever a user view a product on some site.

## Todo
- [x] Create models
- [x] Create data access layer
- [x] Build Queries for finding total users and total unique users who viewed a product
- [x] Create endpoints/controllers
- [ ] Create script to populate the database with a million of documents


## Get started
1. clone the project and install the dependencies
```
npm install
```
2. Create a .env file as the following format
```
PORT=3000
MONGO_URL=mongodb://127.0.0.1/product-gallery
```

3. Start the server
```
npm start
```

Endpoint for finding total users who viewed a product
`http://localhost:3000/api/v1/product/:productId/views`

Endpoint for finding unique users who viewed a product
`http://localhost:3000/api/v1/product/:productId/unique-views`

The structure of the response:
```json
[
  {
    "date": "2020-11-20",
    "views": 6
  }
]
``` 
