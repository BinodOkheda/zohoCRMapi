# Zoho CRM Integration Project

This project demonstrates the integration with Zoho CRM, allowing you to create, retrieve, update, and delete leads. It utilizes the Zoho CRM API and provides a set of routes for these operations. Here's an overview of the project and documentation for each route.

## Table of Contents
- [Project Overview](#project-overview)
- [Setup](#setup)
- [Routes](#routes)
  - [Authentication](#authentication)
  - [Lead Routes](#lead-routes)
- [Common Configuration](#common-configuration)
- [Notes](#notes)

## Project Overview

This project enables integration with Zoho CRM to perform lead-related operations through a set of RESTful API routes. It is built using Node.js and Express and leverages Zoho CRM's API for managing leads. The routes allow you to perform the following operations:
- Authenticate with Zoho CRM.
- Create a lead in Zoho CRM.
- Retrieve a list of leads from Zoho CRM.
- Update an existing lead in Zoho CRM.
- Delete a lead from Zoho CRM.

## Setup

Before running the project, you need to set up your environment by configuring environment variables. You can create a `.env` file and add the following variables with your Zoho CRM API credentials:

```env
clientID=YOUR_CLIENT_ID
clientSecret=YOUR_CLIENT_SECRET
redirectUri=YOUR_REDIRECT_URI
session_secret=YOUR_SESSION_SECRET


# Routes

## Authentication
The authentication routes handle the process of obtaining access and refresh tokens from Zoho CRM.

### OAuth Authorization
- **Route:** `/auth/oauth`
- **Description:** Redirects the user to the Zoho CRM login page to obtain authorization.
- **Method:** GET

### OAuth Callback
- **Route:** `/auth/callback`
- **Description:** Receives the grant token from Zoho CRM, exchanges it for access and refresh tokens, and stores them in the session.
- **Method:** GET

## Lead Routes
The lead routes are responsible for lead-related operations.

### Create Lead
- **Route:** `/leads/submit`
- **Description:** Creates a new lead in Zoho CRM using the provided data.
- **Method:** POST
- **Parameters:** JSON data (name, email, phone)

### Retrieve Leads
- **Route:** `/leads/leads`
- **Description:** Retrieves a list of leads from Zoho CRM.
- **Method:** GET

### Update Lead
- **Route:** `/leads/leads/edit/:leadId`
- **Description:** Updates an existing lead in Zoho CRM with new data.
- **Method:** POST
- **Parameters:** JSON data (name, email, phone)

### Delete Lead
- **Route:** `/leads/leads/delete/:leadId`
- **Description:** Deletes a lead from Zoho CRM.
- **Method:** GET

## Common Configuration
In addition to specific route configurations, common configuration and functionality are provided as middleware.

### Session Management
- Express session management is set up to store and manage tokens.

### Token Management
- Middleware is implemented to check for token expiration, refresh tokens, and maintain valid access tokens for secure interactions with Zoho CRM.

## Notes
- Ensure that you have a valid Zoho CRM account and API credentials.
- Proper error handling and validation can be added based on your application's requirements.
- Customize the project to suit your specific use case or integrate it into a larger application.
