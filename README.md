# Tic Tac Toe API

This is the backend API for the Tic Tac Toe game, built with **Express**, **TypeScript**, **MongoDB**, and **TypeDI**. It provides endpoints for managing games and rounds of the tic-tac-toe game.

## 📦 Tech Stack

- **Node.js** with **Express**
- **TypeScript**
- **MongoDB** with Mongoose
- **TypeDI** for dependency injection
- **Render** for deployment

## 🚀 Live API

🌍 **Production URL**:  
`https://tictactoe-api-qfrz.onrender.com`

Example endpoint:  
`GET https://tictactoe-api-qfrz.onrender.com/api/games/1/10`

## 🛠️ Setup Instructions

### 1. Clone the repo

```
git clone https://github.com/your-username/tictactoe-api.git
cd tictactoe-api
```
2. Install dependencies
```
npm install
```
4. Create .env file
```
//env
PORT=5000
MONGO_URI=your_mongo_connection_string
FE_URL=http://localhost:3000  # Or "*" to allow all origins
```
If you want your API to be publicly accessible by any frontend, use FE_URL=*.

5. Run locally
```
npm run dev
```
