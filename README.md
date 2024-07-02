# Node.js Server API Documentation.


## Overview
 - This documentation covers the API endpoints for the Node.js server built with Express. The server provides functionality interacting with the supabase and the Gemini on the server side rather than exposing themselves on the client side.

## Base URL
- https://hushh-extension-backend.onrender.com/user


### 1. Get Category

**Endpoint**: `/getCategory`

**Method:** `POST`

**Description:** 
- Extracts the product data, which includes price, brand, currency.

**Request Body:**

- This is the main body data
```json
{
  "APIData" : "base64encodedstring"
}
```
- The base64encodedstring is as below.
``` 
{
  "linkUrl": "https://www.nike.com/in/t/lebron-nxxt-gen-ampd-ep-basketball-shoes-G2Xh7F/FJ1567-001",
  "type": 1,
  "userId":  `user_id_here`
}
```

**Response**

- #### 200 OK

```{ response: category_data, status: 1 } ```

- #### 400 Bad Request

``` { message: linkUrl and query are missing. }```

- #### 404 Unauthorized Request
``` 
{
  message: "User not found, please create an account",
  status: 404,
} 
```

- #### 500 Internal Server Error

``` { error: e.message, message: "Internal Server Error" }```

### 2. Insert Product Data

**Endpoint**: `/insertProductData`

**Method:** `POST`

**Description:** 
- Saves the product data for the particlar user in the backend.

**Request Body:**
- This is the main body Data.

``` 
{
  "productData": base64encodedstring
}
```
- This is the base64encodedstring

``` { userID: userID, productData: Data }```

**Response**

- #### 200 OK

```{ message: "Product Inserted Successfully", status: 1 } ```

- #### 400 Bad Request
``` 
{ message: "Cannot find the brand name", error: brandCheckError }
```

- #### 500 Internal Server Error

``` { message: "Internal Server Error", error: Error }```


### 3. Insert Into Collection.



**Endpoint**: `/insertIntoCollection`

**Method:** `POST`

**Description:** 
- Creates a new collection and adds the products in the collection.

**Request Body:**

- This is the main body data
```json
  {
  "hushh_id": "UID",
   "collection_name": "name",
   "collection_data": "selectedItems",
   }
```

**Response**

- #### 200 OK

```{message:"User Collection Created", status : 1} ```


- #### 404 Unauthorized Request
``` 
{ message: "Invalid User ID, please check", status: 404 } 
```

- #### 500 Internal Server Error

``` {message:'Internal Server Error',error: error}```

### 4. Insert Browsing Behaviour

**Endpoint**: `/insertBrowsingBehaviour`

**Method:** `POST`

**Description:** 
- Inserts the Browsing behaviour of that particular user.

**Request Body:**

- This is the main body data
```json
  {
  "hushh_id": "userID",
  "brand": "key",
  "email": "email",
  "duration": "time,
  "product_clicks": "value.length",
  "interest_keywords": "interests.toString()",
  "website_url": "pageUrls",
  "source": "browser_companion",
  }
```

**Response**

- #### 200 OK

```{ message: "User behaviour data updated" } ```

- #### 201 OK

```{ message: "User behaviour data inserted" } ```


- #### 404 Unauthorized Request
``` 
{ message: "Invalid User ID, please check", status: 404 } 
```

- #### 500 Internal Server Error

``` { message: "Error updating the behaviour data", error: updateError }```


### 4. CAtegorize Search History

**Endpoint**: `/categorizeSearches`

**Method:** `POST`

**Description:** 
- Categorizes the search history.

**Request Body:**

- This is the main body data
```json
  {
  searchQueries: searchQueries
  }
```

**Response**

- #### 200 OK

```{response: results} ```

