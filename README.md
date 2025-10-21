# visual-schedule-app

A colorful interactive calendar application for creating visual schedules for children

## Features

* **Color-coded calendar** - Each weekday has a unique color for easy recognition
* **Activity management** - Add, view and delete activities with emoji icons
* **All-day events** - Support for both timed and all-day activities
* **Repeating activities** - Add activities to all occurrences of a weekday in a month
* **Persistent storage** - Activities are saved locally and persist across sessions
* **Month navigation** - Easily browse through different months
* **Responsive design** - Works on desktop, tablet and mobile devices

## Live demo

**Deployed at:** [https://visual-schedule-app.netlify.app/](https://visual-schedule-app.netlify.app/)

## Technologies
* **JavaScript (ES6+)** - Modern vanilla JavaScript with modules
* **HTML & CSS** - Semantic markup and responsive styling
* **LocalStorage API** - Client-side data persistence
* **emoji-picker-element** - Emoji selection component
* **Jest** - Unit testning framework
* **Netlify** - Deployment platform

## Installation
### Prerequisties

* Node.js
* npm

### Setup

1. **Clone the repository:**
```bash
   git clone https://github.com/blimob/visual-schedule-app.git
   cd visual-schedule-app
```

2. **Install dependencies:**
```bash
   npm install
```

3. **Build for development:**
```bash
   npm run build
```

4. **Start local server:**
```bash
   npm start
```

5. **Open in browser:**
```
   http://localhost:8080
```

## 📂 Project Structure
```
visual-schedule-app/
├── public/              # Static files (HTML, CSS)
│   ├── css/
│   │   └── styles.css
│   ├── index.html
│   ├── src/            # Built source (created by npm run build)
│   └── lib/            # Built dependencies (created by npm run build)
├── src/                # Source code
│   ├── constants/      # Application constants
│   │   └── messages.js
│   ├── controllers/    # MVC Controllers
│   │   ├── ActivityController.js
│   │   └── CalendarController.js
│   ├── models/         # MVC Models
│   │   ├── CalendarModel.js
│   │   └── ScheduleManager.js
│   ├── services/       # Service layer
│   │   └── StorageService.js
│   ├── views/          # MVC Views
│   │   ├── ActivityFormView.js
│   │   └── MonthView.js
│   └── index.js        # Application entry point
├── tests/              # Jest unit tests
│   ├── CalendarModel.test.js
│   ├── ScheduleManager.test.js
│   └── setup.js        # Test configuration
├── build.js            # Build script for deployment
├── server.js           # Local development server
├── jest.config.js      # Jest configuration
├── package.json
└── README.md
```
## Testing

Run unit tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```