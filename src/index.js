import { ScheduleManager } from '../src/models/ScheduleManager.js'
import { CalendarModel } from '../src/models/CalendarModel.js'
import { CalendarController } from '../src/controllers/CalendarController.js'
import { MonthView } from '../src/Views/MonthView.js'

// Allt med RELATIVA paths!

console.log('🚀 Visual Schedule App Starting...')

// Skapa Models
const scheduleManager = new ScheduleManager()
const calendarModel = new CalendarModel()

// Skapa Views
const calendarContainer = document.getElementById('calendar-container')
const monthView = new MonthView(calendarContainer)

// Skapa Controller
const calendarController = new CalendarController(
  scheduleManager,
  calendarModel,
  monthView
)

// Starta appen!
calendarController.initialize()

console.log('✅ App initialized!')