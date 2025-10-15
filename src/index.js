import { Activity } from '/node_modules/visual-schedule/src/Activity.js'
import { Child } from '/node_modules/visual-schedule/src/Child.js'
import { DaySchedule } from '/node_modules/visual-schedule/src/DaySchedule.js'
import { getColorForDate } from '/node_modules/visual-schedule/src/weekdayColors.js'
import { CalendarModel } from './models/CalendarModel.js'
import { ScheduleManager } from './models/ScheduleManager.js'
import { CalendarController } from './controllers/CalendarController.js'
import { MonthView } from './Views/MonthView.js'

// Create a child
const emma = new Child('Emma', 6)

// Create activities
const breakfast = new Activity('Breakfast', '07:30', '08:00').setIcon('🥐')
const school = new Activity('School', '08:30', '15:00').setIcon('📚')
const play = new Activity('Play time', '15:30', '17:00').setIcon('⚽')

// Add activities to child
emma.addActivity(breakfast)
emma.addActivity(school)
emma.addActivity(play)

// Create daily schedule
const today = new DaySchedule()
today.addChild(emma)

// Get child's schedule
const schedule = today.getChildSchedule(emma.id)
console.log(`${schedule.child.name} has ${schedule.activities.length} activities`)

// Get day color
const dayColor = getColorForDate(new Date())
console.log(`Today's color: ${dayColor}`)

const calendarModel = new CalendarModel()

console.log('📅 Current month:', calendarModel.getCurrentMonth())
console.log('📅 Month name:', calendarModel.getMonthName())
console.log('📅 Days in month:', calendarModel.getDaysInMonth().length)

const firstDay = calendarModel.getDaysInMonth()[0]
console.log('📅 Första dagen är:', firstDay.toDateString())
console.log('📅 Veckodag nummer:', firstDay.getDay())  // 0=Sön, 1=Mån, 2=Tis, 3=Ons...
console.log('🎨 Färg:', calendarModel.getColorForDay(firstDay))

// Skapa Models
const scheduleManager = new ScheduleManager()

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