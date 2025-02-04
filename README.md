#### Before starting, create a .env file in the root directory and provide MONGO_URI = , PORT = , JWT_SECRET= 

#### After this, install the dependency packages using "npm install"

#### Start the app using "npm run dev"



**API Documentation**

This documentation outlines the endpoints available in the application, their methods, expected request and response payloads, and access control.


| Endpoint | Method | Description | Request Body | Response | Access Control |
|---|---|---|---|---|---|
| `/api/users/register` | POST | Register a new user | ```json { "username": "john_doe", "email": "john.doe@example.com", "password": "secure_password" } ``` | ```json { "message": "User created successfully", "user": { "username": "john_doe", "email": "john.doe@example.com", "_id": "user_id", //... other user details } } ``` | Public |
| `/api/users` | GET | Get a list of all users (excluding passwords) | None | ```json { "message": "Welcome, authorized user!", "user": [ { "username": "john_doe", "email": "john.doe@example.com", "_id": "user_id" }, //... other user objects ] } ``` | Requires authentication |
| `/api/users/update` | PUT | Update user information (requires authentication) | ```json { "username": "updated_username", "email": "updated.email@example.com", "password": "new_password", "role": "shipper" } ``` | ```json { "message": "User updated successfully", "user": { "username": "updated_username", "email": "updated.email@example.com", "role": "shipper", "_id": "user_id", //... other user details } } ``` | Requires authentication, Admin role |
| `/api/auth/login` | POST | Login and obtain JWT | ```json { "email": "simple@abc.com", "password": "secure_password" } ``` | ```json { "token": "jwt_token_string" } ``` | Public |

**Notes:**

* **Authentication:**
    - All endpoints except `/api/users/register` and `/api/auth/login` require authentication (JWT).
    - The `/api/users/update` endpoint additionally requires the 'admin' role.
    - Other roles (shipper and carrier) could be set using the "update " endpoint. 
    - To protect other endpoints using the roles, the "isShipper" and "isCarrier" middleware could be used
* **Error Handling:**
    - Appropriate HTTP status codes (e.g., 400, 401, 403, 500) are returned with informative error messages.
* **Data Masking:**
    - User passwords are not included in any response to protect user data.

