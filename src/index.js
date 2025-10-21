import { ScheduleManager } from './models/ScheduleManager.js'
import { CalendarModel } from './models/CalendarModel.js'
import { CalendarController } from './controllers/CalendarController.js'
import { MonthView } from './Views/MonthView.js'

console.log(' Visual Schedule App Starting...')

const scheduleManager = new ScheduleManager()
const calendarModel = new CalendarModel()

const calendarContainer = document.getElementById('calendar-container')
const monthView = new MonthView(calendarContainer)

const calendarController = new CalendarController(
  scheduleManager,
  calendarModel,
  monthView
)

calendarController.initialize()

console.log('App initialized!')