BusinessOS API Documentation

## Base URL

Development:
http://localhost:5000/api

# Authentication

## Register User

Method: POST
Endpoint: `/auth/register`

Body:
{
  "business": {
    "name": "",
    "email": "",
    "businessType": "",
    "phone": "",
    "address": {
        "country": "",
        "state": "",
        "city": "",
        "street": "",
        "zipCode": ""
    }
  },
  "owner": {
    "firstName": "",
    "lastName": "",
    "email": "",
    "phone": "",
    "password": ""
  }
}

## Login

Method: POST
Endpoint: `/auth/login`

Body:
{
    "email": "",
    "password": ""
}

------