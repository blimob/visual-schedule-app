import { Activity } from 'Visual-Schedule/src/Activity.js'
import { Child } from 'Visual-Schedule/src/Child.js'
import { DaySchedule } from 'Visual-Schedule/src/DaySchedule.js'
import { getColorForDate } from 'Visual-Schedule/src/WeekdayColors.js'

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