# 🏕️ YelpCamp
*A full-stack campground sharing web app built with Node.js, Express, MongoDB, and more.*

<!-- ![YelpCamp Screenshot](./public/images/yelpcamp-banner.png) -->

---

## 📑 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [Environment Variables](#-environment-variables)
- [Database Models](#-database-models)
- [Deployment](#-deployment)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [Acknowledgments](#-acknowledgments)
- [License](#-license)
- [Contact](#-contact)

---

## 🏕 Overview
**YelpCamp** is a full-stack web application that allows users to:
- Discover and review campgrounds shared by others.
- Create, edit, and delete their own campgrounds.
- Add photos, leave comments, and rate experiences.

Originally developed as part of **Colt Steele’s “Web Developer Bootcamp”**, YelpCamp demonstrates RESTful routing, CRUD operations, authentication, and deployment.

<!-- 🔗 **Live Demo:** [https://yelpcamp-demo.example.com](#) -->
📦 **Repository:** [https://github.com/VinceNeuda/yelpcamp-project](#)

---

## ✨ Features
- 🧭 **Full CRUD:** Create, read, update, delete campgrounds & reviews.
- 🔐 **User Authentication:** Register/login system using Passport.js.
- 🧑‍🤝‍🧑 **Authorization:** Only owners can edit or delete their content.
- 📸 **Image Uploads:** Integrated with Cloudinary for media hosting.
<!-- - 🗺️ **Geocoding & Maps:** Campgrounds displayed on interactive Mapbox maps. -->
- ⚙️ **Error Handling & Flash Messages:** Friendly UX for errors and feedback.
- 📱 **Responsive Design:** Works on desktop and mobile.
- 🧰 **Environment Configuration:** Secure via `.env` variables.

---

## 🧩 Tech Stack
**Frontend:**
- EJS templating
- Bootstrap / custom CSS
- Client-side JS (vanilla)

**Backend:**
- Node.js / Express.js
- MongoDB / Mongoose ORM
- Passport.js for authentication
- Joi for validation
- Express-Session & Connect-Mongo for session storage

**Other Services:**
- Cloudinary (image storage)
- Mapbox (maps & geocoding)
- Helmet for security headers

---

## 📁 Project Structure
```
YelpCamp/
├── app.js
├── package.json
├── /models
│   ├── campground.js
│   ├── review.js
│   └── user.js
├── /routes
│   ├── campgrounds.js
│   ├── reviews.js
│   └── users.js
├── /views
│   ├── campgrounds/
│   ├── reviews/
│   ├── users/
│   └── partials/
├── /public
│   ├── css/
│   ├── js/
│   └── images/
└── /seeds
    └── index.js
```

---

## ⚙️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/YelpCamp.git
cd YelpCamp
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add the required variables (see [below](#-environment-variables)).

### 4. Seed the Database (optional)
```bash
node seeds/index.js
```

### 5. Run the Server
```bash
npm start
```

App will be running on:
👉 `http://localhost:3000`

---

## 🧰 Environment Variables
Create a `.env` file with the following keys:
```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
MAPBOX_TOKEN=your_mapbox_token
DB_URL=mongodb://localhost:27017/yelp-camp
SESSION_SECRET=supersecretkey
```

---

## 🗃️ Database Models

### Campground
```js
{
  title: String,
  price: Number,
  images: [ { url, filename } ],
  geometry: { type: { type: String }, coordinates: [Number] },
  description: String,
  location: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  reviews: [ { type: Schema.Types.ObjectId, ref: 'Review' } ]
}
```

### Review
```js
{
  body: String,
  rating: Number,
  author: { type: Schema.Types.ObjectId, ref: 'User' }
}
```

### User
```js
{
  email: String,
  username: String,
  hash: String,
  salt: String
}
```

---

## 🚀 Deployment
1. Push code to GitHub.
2. Set up MongoDB Atlas and Cloudinary accounts.
3. Deploy on Render / Fly.io / Heroku (or similar).
4. Configure environment variables on the host platform.

---

## 🛠️ Future Improvements
- Implement Image upload and Database 
- Add Interractive Map functionality
- Add user profile pages
- Improve map filtering & search
- Add campground categories / tags
- Implement rating system visualization
- Add API endpoints for mobile use

---

## 🤝 Contributing
Pull requests are welcome!
If you’d like to improve this project:
1. Fork it
2. Create your feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push and submit a PR

Please make sure your code passes ESLint checks.

---

## 🙏 Acknowledgments
- [Colt Steele – The Web Developer Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/)
- Mapbox & Cloudinary for their free tiers
- Express and Mongoose contributors
- Inspiration: Yelp’s review system

---

<!-- ## 📜 License
This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

--- -->

## 📬 Contact
👤 Vince Neuda
📧 neudavince@gmail.com
💻 [GitHub Profile](https://github.com/VinceNeuda)
<!-- 🌐 [Portfolio Website](https://yourportfolio.com) -->
