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

## Architecture

This application follows the **Model-View-Controller (MVC)** pattern:

* **Models** - Manage data and business logic (`CalendarModel`, `ScheduleManager`)
* **Views** - Handle DOM rendering and user interface (`MonthView`, `ActivityFormView`)
* **Controllers** - Coordinate between Models and Views (`CalendarController`, `ActivityController`)
* **Services** - Provide cross-cutting concerns (`StorageService`)

### Key Design Principles

* **Single Responsibility Principle (SRP)** - Each class has one reason to change
* **Dependency Injection** - Dependencies passed through constructors
* **Encapsulation** - Private fields using JavaScript `#` syntax
* **Separation of Concerns** - Clear boundaries between layers

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start local development server |
| `npm run build` | Build for production (copies src/ and dependencies to public/) |
| `npm test` | Run Jest tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate test coverage report |

## Deployment

The app is configured for automatic deployment on **Netlify**:
1. **Push to GitHub** - Commits to `main`branch trigger deployment
2. **Build process** - Netlify runs `npm run build`
3. **Deploy** - Constents of `public/`directory are published

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Author

**Blinera Moberg**
* Email: bm222mr@student.lnu.se
* GitHub: [@blimob](https://github.com/blimob)

## Acknowledgments

* Built as part of the 1DV610 Software Quality course at Linnaeus University
* Inspired by visual scheduling needs for children
* Uses the [visual-schedule](https://github.com/blimob/Visual-Schedule) npm package for core scheduling logic

## Documentation

* [REFLECTION.md](REFLECTION.md) - Clean Code analysis and reflections
* [TESTRAPPORT.md](TESTRAPPORT.md) - Manual testing report
* [visual-schedule package](https://github.com/blimob/Visual-Schedule) - Core scheduling library documentation

## Known Issues

* None currently reported

## Future Enhancements

* [ ] Week view in addition to month view
* [ ] Day view in addition to month view
* [ ] Weekdays on the month view
* [ ] Export/import schedule data
* [ ] Multiple child profiles
* [ ] Print-friendly schedule format
* [ ] Dark mode support
* [ ] Activity templates and categories
* [ ] English weekdays to Swedish weekdays

---