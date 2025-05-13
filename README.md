# Lydia Backend

## Mission

Lydia is a platform designed to connect restaurants and food suppliers with charitable organizations to reduce food waste and help those in need. By facilitating the donation of excess food that would otherwise go to waste, Lydia serves as a bridge between abundance and scarcity—ensuring that perfectly good food reaches people experiencing food insecurity rather than landfills.

## Overview

This backend API powers the Lydia platform, enabling restaurants and food suppliers to list available food donations, and allowing charities and beneficiaries to claim these items for distribution to those in need.

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Running the Application](#running-the-application)
- [Architecture](#architecture)
  - [Domain-Driven Design](#domain-driven-design)
  - [Module Structure](#module-structure)
  - [Key Design Patterns](#key-design-patterns)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)
- [About Lydia](#about-lydia)

---

## Features

- User authentication and authorization with Auth0
- Supplier management and verification
- Beneficiary organization registration and verification
- Food item listing and management
- Order processing and tracking
- Email notifications for order status updates
- Rate limiting and security features

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm (v7 or higher)
- An Auth0 account for authentication

### Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/lydia_backend.git
cd lydia_backend
```

Install dependencies:

```bash
npm install
```

### Environment Configuration
Create a `.env` file in the root directory with the following variables:

```bash
# Server Configuration
PORT=3001
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/lydia

# Auth0 Configuration
AUTH0_DOMAIN=your-auth0-domain.auth0.com
AUTH0_AUDIENCE=https://your-api-identifier

# Email Configuration (for notifications)
EMAIL_HOST=smtp.example.com
EMAIL_PORT=465
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-email-password
EMAIL_FROM=noreply@lydia.com
EMAIL_SECURE=true
```

### Running the Application
Development Mode

```bash
npm run dev
```

The API will be available at `http://localhost:3001`.

## Architecture
### Domain-Driven Design
Lydia backend follows Domain-Driven Design (DDD) principles to organize the codebase around the business domain. The application is structured into modules, each representing a bounded context within the domain.

### Module Structure

```bash
src/
├── constants/            # Global constants and error codes
├── middlewares/          # Express middlewares
├── routes/               # API routes
├── shared/               # Shared utilities and types
└── modules/              # Domain modules
    ├── beneficiary/      # Beneficiary organization module
    │   ├── controllers/  # HTTP request handlers
    │   ├── domain/       # Domain entities and business rules
    │   ├── infra/        # Infrastructure (DB models, repos)
    │   ├── types/        # TypeScript types and interfaces
    │   ├── useCases/     # Application use cases
    │   └── utils/        # Utility functions
    ├── supplier/         # Food supplier module
    ├── item/             # Food item module
    ├── order/            # Order module
    └── notification/     # Notification module
        ├── handlers/     # Email handlers
        ├── templates/    # Email templates
        ├── types/        # TypeScript types
        ├── useCases/     # Notification use cases
        └── utils/        # Utility functions
```

### Key Design Patterns
1. Repository Pattern – Abstracts data access behind interfaces
2. Use Case Pattern – Encapsulates business logic in dedicated functions
3. Domain Entities – Represent core business concepts with validation logic
4. Value Objects – Immutable objects representing domain values
5. Factory Methods – Create domain entities with proper validation

### Authentication
The API uses Auth0 for authentication. All endpoints (except the health check) require a valid JWT token.

### Steps to Configure:
1. Set up an Auth0 account and configure an API.
2. Add the Auth0 domain and audience to your .env file.
3. Include the JWT token in the Authorization header for all requests:

```bash
Authorization: Bearer <your_token>
```

### Contributing
Contributions are welcome! Please fork the repository and open a pull request with your changes.

### License
This project is licensed under the MIT License.

### About Lydia
Lydia is committed to fighting food waste and food insecurity simultaneously. By connecting those with surplus food to those who need it most, we create a more sustainable and compassionate food system.