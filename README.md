# Introduction

This marketplace starter provides a foundational example to help you build and customize your own marketplace using Medusa.js. Begin your project with this starter template and tailor it to meet your specific needs.

## Getting Started

Visit the [Quickstart Guide](https://docs.medusajs.com/create-medusa-app) to set up a server.

Visit the [Docs](https://docs.medusajs.com/development/backend/prepare-environment) to learn more about our system requirements.

# User Management

The user management is facilitated by three additional columns in the user table: `is_admin`, `store_id` and `status`. A marketplace admin is identified by the `is_admin` column set to TRUE, and `store_id` set to NULL, indicating an administrative role. Additionally, the `role` column in the user table can be utilized to implement Role-Based Access Control (RBAC) for marketplace and store users. Vendor after register has status set to `pending` and only after admin changes that status to `active` vendor can log in.

# Store Setup

Upon registering, a user's account is linked to a new Store entity. The store owner can then invite additional users to their store using Medusa's invite system, enabling team collaboration.

# Shipping Options

Stores have the ability to create and manage their own shipping options, which are then associated with their products. These shipping options are visible in the product responses to ensure clear communication of shipping terms.

# Product Management

When a product is created, the `store_id` of the currently logged-in user's store is associated with the product. This ensures that all products are correctly linked to their respective stores.

# Order Processing

Upon placing an order, the system automatically generates child orders for each vendor involved. This is achieved by iterating through each line item, checking the `store_id`, and grouping items from the same store into a single order. These child orders are then visible in the respective vendor's dashboard for processing.

Feel free to extend and modify this starter as needed to suit your marketplace requirements.

# Docker image1
```bash
docker build -t sqoonyv3/mercur .
docker push sqoonyv3/mercur
```

```bash
docker build -f admin.dockerfile -t sqoonyv3/mercur-admin .
docker push sqoonyv3/mercur-admin
```

```bash
docker build -f vendor.dockerfile -t sqoonyv3/mercur-vendor .
docker push sqoonyv3/mercur-vendor
```

```bash
docker compose -f docker-compose.yml --project-name mercur up -d
```