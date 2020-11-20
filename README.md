
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
- [x] Create script to populate the database with 1M+ of documents


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

Query filters for both endpoints: 

| Param      | Description                                            |   |   |   |
|------------|--------------------------------------------------------|---|---|---|
| start_date | Timestamp/Date to get aggregate views from INCLUSIVE.  |   |   |   |
| end_date   | Timestamp/Date to get aggregate views until INCLUSIVE. |   |   |   |
| group_by   | Group by "day"/"week"/"month"/"year"                   |   |   |   |

The structure of the response:
```json
[
  {
    "date": "2020-11-20",
    "views": 6
  }
]
``` 

## Queries performance
You can run
```
npm run populate-db
```
This script will populate the DB with about 1.8M+ for static 10 products 
```json
[
  "5fb79eb0357779493c3afe1d",
  "5fb79eb0357779493c3afe1e",
  "5fb79eb0357779493c3afe1f",
  "5fb79eb0357779493c3afe20",
  "5fb79eb0357779493c3afe21",
  "5fb79eb0357779493c3afe22",
  "5fb79eb0357779493c3afe23",
  "5fb79eb0357779493c3afe24",
  "5fb79eb0357779493c3afe25",
  "5fb79eb0357779493c3afe26"
]
```

after then, you can use one of the above ids to test the endpoints 
