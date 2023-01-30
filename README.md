# ESHOP
Ecommerce website with python and django-rest-framework on backend and react-js on frontend.

## Features:
- Proudct list
- Top rated products carousel
- Login and registration
- Adding reviews to products
- Search
- Pagination
- Stock
- Order, checkout and payment features
- Shipping cart
- Deliver and payment status
- Admin panel for view users, adding new products, stock and inspect orders

# Installation

## Backend
Let's setup our python backend.
```    
> cd backend
```
First you need to create your python virtual environment:
```
> python3 -m venv venv
```
You can use any virtual environment, but here I use venv.
Activate virtual environment:
```
> source venv/bin/activate
```
Then you need to install requierments for our shop:
```
> pip install -r requierements.txt
```
Now you can run django server
```
> python3 manage.py runserver
```
That's it for our backend.
## Frontend
Go to frontend directory:
```
> cd ../frontend
```
Install dependences:
```
> npm install
```
Run frontend server:
```
> npm start
```
Now if you go to http://localhost:3000 you will see the main page.

# License
MIT