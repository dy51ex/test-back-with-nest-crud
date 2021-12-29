# Test-back


## How to use

* Clone repo
* Build with ```docker-compose build```
* Run with ```docker-compose up```

## Available endpoints

* POST ```/auth/register``` - for create new user
* POST ```/auth/login``` - return jwt, use for Bearer auth
* GET ```/products/```- retrieve all products (empty on startup)
* POST ```/products/``` - add new product
* PATCH ```/products/:id``` - partially update product
* GET ```/products/:id``` - get single product by id

### Additions
* The administrator user is created at startup with creds: ```admin@admin.ru/admin```
