# final-project-backend
SpartaCodingClub Final Project
Standar API

{root.api}/v1/{grouping}
SAMPLE:
```http://localhost:8000/v1/auth/login


Standar Status response :
200 - OK                    --> Call API Success
201 - CREATED               --> Post Success
400 - BAD REQUEST           --> Error on client side
401 - UNAUTHORIZED          --> User not authorized to the request
403 - FORBIDDEN
404 - NOT FOUND
500 - INTERNAL SERVER ERROR --> Error on Server Side
502 - BAD GATEWAY

GROUP: Authentication

[1] Register
    {root.api}/{version}/auth/register
req: {
    "name":"Testing",
    "email":"test@gmail.com",
    "password":"password123"
}

res: {
    "message":"Register Success",
    "data": {
        "id":1,
         "name":"Testing",
        "email":"test@gmail.com",
        "password":"password123"
    }
}

err-response: 
400 -> Input yang anda masukan tidak valid

[2] Login
    {root.api}/{version}/auth/login
    
req:

GROUP: Main-app/Destination
[1] Create destination post
[POST] : {root.api}/{version}/destination/post

req: {
    "title": "Title Destination",
    "image":"image.png",
    "description":"Lorem ipsum dolor sit amet"
}

res: {
    "message":"Create Destination Post Success",
    "data": {
        "post_id": 1,
         "title": "Title Destination",
        "image":"image.png",
        "description":"Lorem ipsum dolor sit amet"
        "created_at" : "31/12/2000"
        "author": {
            "uuid":1,
            "name":"Testing"
        }
    }
}


[2] Get destination post
[3] Update destination post
[4] Delete destination post
