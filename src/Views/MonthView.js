export class MonthView {
  #container

  constructor(container) {
    this.#container = container
  }

  render(monthData) {
    this.#container.innerHTML = ''

    // Header
    const header = document.createElement('h2')
    header.textContent = `${monthData.month} ${monthData.year}`
    this.#container.appendChild(header)

    // Grid container
    const daysGrid = document.createElement('div')
    daysGrid.className = 'days-grid'

    // Weekday headers
    const dayNames = ['M', 'Ti', 'O', 'To', 'F', 'L', 'S']
    dayNames.forEach(dayName => {
      const dayHeader = document.createElement('div')
      dayHeader.className = 'weekday-header'
      dayHeader.textContent = dayName
      daysGrid.appendChild(dayHeader)
    })

    // Empty cells before first day
    for (let i = 0; i < monthData.firstDayOfWeek; i++) {
      const emptyCell = document.createElement('div')
      daysGrid.appendChild(emptyCell)
    }

    // Day cells
    monthData.days.forEach(day => {
      const dayCell = document.createElement('div')
      dayCell.className = 'day-cell'
      dayCell.style.backgroundColor = day.color  // Färgkodning!

      const dayNumber = document.createElement('div')
      dayNumber.className = 'date-number'
      dayNumber.textContent = day.date.getDate()
      dayCell.appendChild(dayNumber)

      // Activities
      if (day.activities && day.activities.length > 0) {
        const activitiesList = document.createElement('ul')
        activitiesList.className = 'activities-list'

        day.activities.forEach(activity => {
          const activityItem = document.createElement('li')
          activityItem.className = 'activity-item'
          
          const icon = activity.visual?.icon || ''
          activityItem.textContent = `${icon} ${activity.name}`
          
          activitiesList.appendChild(activityItem)
        })

        dayCell.appendChild(activitiesList)
      }

      daysGrid.appendChild(dayCell)
    })

    this.#container.appendChild(daysGrid)
  }
}