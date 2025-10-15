import { CalendarModel } from './models/CalendarModel.js'
import { ScheduleManager } from './models/ScheduleManager.js'
import { CalendarController } from './Controllers/CalendarController.js'
import { MonthView } from './Views/MonthView.js'

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