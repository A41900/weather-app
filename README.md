# 🌦️ Weather App

A responsive weather application built with **vanilla JavaScript** that displays
real-time weather information for selected cities, with a focus on **clean UI and
practical front-end logic**.

This project was independently designed and implemented as part of my learning
journey and portfolio.

---

## 🚀 Features

- Weather data fetched from an external API
- City-based **local time clock** (timezone calculation)
- Weather data caching using `localStorage`
- Dynamic background images via the Unsplash API
- Smooth animated background transitions
- Error handling for failed API requests
- Responsive glassmorphism-inspired UI

---

## 🛠️ Technologies

- JavaScript (ES6+)
- HTML5
- CSS3
- Weather API
- Unsplash API

---

## 🌐 Live Demo

👉 **https://a41900.github.io/weather-app/**

Please note that this demo uses free-tier API services, which may be subject to 
rate limits. If the demo is temporary unavailable, feel free to run the project 
locally using your own API keys.

---

## 🔐 API Keys & Security Notes

This project is a **client-side only application** deployed using GitHub Pages.
Because the application runs entirely in the browser:

- API keys are required at runtime
- API keys are **included in the repository**
- API keys are **exposed in the browser by design**

This is a known limitation of front-end–only applications hosted on static platforms
such as GitHub Pages.
The keys used in this project belong to **free-tier APIs** and are intended
for **learning and portfolio demonstration purposes only**.

> ⚠️ **Important:**  
> In a production environment, API keys should never be exposed on the client.
> A backend proxy (e.g. Node.js + Express) would be required to securely handle API requests.
> Implementing such a backend is considered a possible future improvement, but is outside
> the scope of this project.


---

## 📂 Project Status

✔ Core functionality completed  
🔧 Possible future improvements:
- Editable city list
- SVG-based animated city titles
- Accessibility improvements
- UI refinements
