# Inventory Tracker

A MERN-stack application for managing product inventory. It provides features for:

* **Requirement 1 (CRUD Interface)**: Add, edit, and delete products, categories, and suppliers.
* **Requirement 2 (Reports)**: Generate inventory reports with dynamic filters (category, supplier, product name, price range, quantity range, below-reorder level).

## Live Demo

Explore the live deployed application on Google App Engine:

[Inventory Tracker Live](https://tribal-monolith-454008-h2.uc.r.appspot.com/products)

## Features

* **Products Page**: Create, update, and delete products. Product form dropdowns for categories and suppliers are populated dynamically from the database.
* **Categories & Suppliers Pages**: Manage categories and suppliers so the products form always has up-to-date options.
* **Inventory Report**: Filter by category, supplier, product name (keyword search), price range, quantity range, and view only items below their reorder level.
* **Performance Optimizations**:

  * **Indexes** on `sku`, `category`, `supplier`, and a compound index on `(quantity, reorderLevel)`, plus the default `_id` index.
  * **Mongoose ORM** for CRUD operations.
  * **Aggregation pipeline** for complex report queries.
* **Concurrency & Transactions**: Transactional patterns for atomic multi-document updates using MongoDB snapshot isolation.

## Tech Stack

* **Backend**: Node.js, Express, Mongoose (MongoDB)
* **Frontend**: React, React Bootstrap, Axios, React Router
* **Database**: MongoDB Atlas
* **Deployment**: Google App Engine

## Running Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/aaryanwadhwani/inventory-tracker.git
   cd inventory-tracker
   ```

2. **Install dependencies**

   ```bash
   npm install
   cd client
   npm install
   cd ..
   ```

3. **Environment Variables**

   Create a `.env` file in the project root with:

   ```
   MONGODB_URI=<your MongoDB Atlas connection string>
   PORT=5000
   ```

4. **Start the Backend**

   ```bash
   npm run dev
   ```

5. **Start the Frontend**

   ```bash
   cd client
   npm start
   ```

## Project Structure

```
inventory-tracker/
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       └── App.js
├── models/
├── routes/
├── server.js
├── app.yaml
└── README.md
```
