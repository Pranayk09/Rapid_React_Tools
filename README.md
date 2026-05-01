# 🚀 React Text Multitool App

A simple React multitool web application that combines useful text utilities in one place.  
This project demonstrates API integration using RapidAPI (Google Translate) and includes a customizable string generator built with reusable React components.

---

## 📌 Features

### 🌍 Text Translator
Translate text instantly into multiple languages using Google Translate via RapidAPI.

**Capabilities**
- Multi-language translation
- Fast API-based response
- Clean and minimal UI
- Error handling

### 🔤 String Generator
Generate customizable random strings for development and testing.

**Options**
- Custom string length
- Uppercase letters
- Lowercase letters
- Numbers
- Symbols

Perfect for dummy data, tokens and testing inputs.

---

## 🛠️ Tech Stack

- React
- JavaScript (ES6+)
- RapidAPI (Google Translate)
- CSS

---

## 📂 Project Structure

```
react-text-multitool/
│
├── public/
├── src/
│   ├── components/
│   │   ├── Translator.js
│   │   ├── StringGenerator.js
│   │   └── Navbar.js
│   │
│   ├── App.js
│   ├── index.js
│   └── styles.css
│
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```
git clone https://github.com/yourusername/react-text-multitool.git
cd react-text-multitool
```

### 2. Install dependencies
```
npm install
```

### 3. Get RapidAPI Key
1. Go to RapidAPI  
2. Subscribe to Google Translate API  
3. Copy your API key  

### 4. Create `.env` file
Create a file in the root folder and add:
```
REACT_APP_RAPIDAPI_KEY=your_api_key_here
```

### 5. Run the app
```
npm start
```

App runs at:
```
http://localhost:3000
```

---

## 🔌 Example API Usage

```javascript
const options = {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
    "X-RapidAPI-Host": "google-translate1.p.rapidapi.com"
  },
  body: JSON.stringify({
    q: text,
    target: language
  })
};
```

---

## 🎯 Learning Goals

This project helps you practice:
- React Hooks
- Component architecture
- Environment variables
- REST API integration
- Async requests
- Basic UI design

