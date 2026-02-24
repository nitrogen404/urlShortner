# URL Shortener (Scalable System Design Project)

A high-performance, full-stack URL shortening service engineered with FAANG-level system design principles in mind. This project demonstrates how to build a scalable, decoupled architecture using Node.js, React, MongoDB, and Redis.

*[A good read](https://www.educative.io/courses/grokking-the-system-design-interview/system-design-tinyurl?eid=5082902844932096&utm_term=&utm_campaign=%5BNew+-+Mar+24%5D+Brand+Core+Performance+Max&utm_source=adwords&utm_medium=ppc&hsa_acc=5451446008&hsa_cam=21099703438&hsa_grp=&hsa_ad=&hsa_src=x&hsa_tgt=&hsa_kw=&hsa_mt=&hsa_net=adwords&hsa_ver=3&gad_source=1&gad_campaignid=21089679273&gbraid=0AAAAADfWLuSVWBKwNFeO63kQFKi8rGAJ0&gclid=CjwKCAiAzOXMBhASEiwAe14SaeDqP9NRLbv6zuqli34QHGGjDSCvpuMT9AwdB-jBI4R-4x15Ra0K6xoCLj0QAvD_BwE)*

## Features

* **Base-58 Encoding Logic**: Utilizes a robust Base-58 encoding algorithm combined with a centralized, auto-incrementing MongoDB counter to generate clean, collision-resistant unique short URLs.
* **High-Performance Caching Layer**: Integrates Redis to cache original URLs, drastically reducing MongoDB database reads and ensuring incredibly fast redirect latency.
* **API Rate Limiting**: Implements a Redis-backed fixed-window rate limiter to protect the API ecosystem from malicious abuse and excessive requests.
* **Modern Frontend Interface**: Features a beautiful, responsive Single Page Application (SPA) built with React, Vite, Tailwind CSS, Framer Motion, and Typewriter-effect.
* **Full Containerization**: Backend infrastructure (Node.js API, MongoDB, and Redis) is fully containerized using Docker and Docker Compose for a seamless one-click local deployment.

---

## Tech Stack

**Frontend:**
* React (Vite)
* Tailwind CSS
* Framer Motion
* Lucide React

**Backend:**
* Node.js & Express.js
* MongoDB (Mongoose) - Primary Datastore
* Redis - Caching & Rate Limiting

**DevOps & Infrastructure:**
* Docker & Docker Compose
* *(Planned)* AWS ECS, S3, CloudFront, MongoDB Atlas

---

## Installation & Setup

### Prerequisites
Make sure you have the following installed on your machine:
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)
* [Node.js](https://nodejs.org/en/) (v18+)

### 1. Start the Backend Infrastructure (Docker)
The backend, database, and cache are all defined in the `docker-compose.yml` file.
```bash
# Clone the repository
git clone https://github.com/nitrogen404/urlShortner.git
cd urlShortner

# Start the Node.js API, MongoDB, and Redis containers in the background
docker compose up -d
```
*The backend API will now be running at `http://localhost:3000`.*

### 2. Start the Frontend Application
In a new terminal window, navigate to the `frontend` folder to launch the React app.
```bash
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
*The React app will be running at `http://localhost:5173`. Open this URL in your browser.*

---

## API Endpoints

### 1. Shorten a URL
* **URL:** `/api/v1/urls`
* **Method:** `POST`
* **Body:**
  ```json
  {
    "originalUrl": "https://www.long-domain.com/very/long/path"
  }
  ```
* **Success Response:**
  ```json
  {
    "originalUrl": "https://www.long-domain.com/very/long/path",
    "shortUrl": "http://localhost:3000/68GR",
    "urlCode": "68GR"
  }
  ```

### 2. Redirect to Original URL
* **URL:** `/:shortUrlCode`
* **Method:** `GET`
* **Success:** Returns a `302 Found` HTTP redirect to the original URL. (Served from Redis cache if available).

### 3. Delete a URL
* **URL:** `/api/v1/urls/:shortUrlCode`
* **Method:** `DELETE`
* **Success Response:** `{"message": "URL mapping deleted successfully"}`

---

##  Architectural Decisions

1. **Why Base-58?**
   Base-58 avoids visually ambiguous characters like `0` (zero), `O` (capital o), `I` (capital i), and `l` (lowercase L). This makes the generated short links inherently more readable and less prone to human error when shared manually.
2. **Why Redis for Rate Limiting?**
   By storing rate-limit counters in an in-memory datastore like Redis rather than standard application memory, the backend can easily be horizontally scaled (running multiple container instances) while still sharing a centralized, highly accurate rate-limit count per IP address.
3. **Counter Approach vs. Random Hashing:**
   Instead of generating a random hash and continually querying the database to check for collisions (which degrades performance at scale), this system uses a dedicated MongoDB counter to assign a strictly unique numeric ID to each request. This integer ID is then mathematically encoded into a short Base-58 string, guaranteeing uniqueness with zero collision checks.

---
