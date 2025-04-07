# novel idea

## Project Overview
A MERN-stack book discovery platform where users can explore personalized book recommendations, take a quiz to find new reads, post writing prompts, write book reviews, and create a personalized TBR and Favorites list. Designed to make finding your next read feel like an adventure.

## Tech Stack
**Frontend**: React, Chakra UI, REST API
**Backend**: Node.js, Express.js
**Database**: MongoDB
**Authentication**: JWT (stored in `localStorage`)
**CI/CD**: Render, GitHub Actions

## Features
- User login/registration with JWT
- Book Quiz to find a new read
- Book search and discover
- Favorite and TBR lists
- Create your own writing prompts
- Use writing prompts for book reviews

## Setup Instructions
1. **Clone the repository**
```sh
git clone https://github.com/ElianaScript/book-rec-app.git
cd book-rec-app
```
2. **Backend setup**
```sh
cd server
npm install
npm run start:dev
```
3. **Frontend setup**
```sh
cd client
npm install
npm run start:dev
```
## Environment Variables
1. **Create .env file**
```sh
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

## Live Site
Coming Sooooooon....

## Future Features
- Add comment and like features to writing responses

- More Quizzes for people to try out

- Upload profile pictures and follow friends

- Feed from friends and followers on home page

- API to link Amazon to buy the books from the site

- Comments under reviews and prompts

## Credits
Built with 💙 by Eliana Liantonio
Powered by Matcha lattes, and 80's music

## Contribution
Fork the repo, make a new branch, make changes/commit, submit a PR, and have fun!

## License
MIT License © 2025 ElianaScript

