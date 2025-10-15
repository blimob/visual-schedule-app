export class MonthView {
  #container

  constructor(container) {
    this.#container = container
  }

  render(monthData) {
    this.#container.innerHTML = ''
    this.#renderHeader(monthData)
    this.#renderWeekdayHeaders()  // ← Lägg tillbaka!
    this.#renderDays(monthData)
  }

  #renderHeader(monthData) {
    const header = document.createElement('h2')
    header.className = 'month-title'
    header.textContent = `${monthData.month} ${monthData.year}`
    this.#container.appendChild(header)
  }

  #renderWeekdayHeaders() {
    const weekdays = ['M', 'Ti', 'O', 'To', 'F', 'L', 'S']
    const weekdaysRow = document.createElement('div')
    weekdaysRow.className = 'weekdays-row'
    
    weekdays.forEach(day => {
      const dayElem = document.createElement('div')
      dayElem.className = 'weekday-header'
      dayElem.textContent = day
      weekdaysRow.appendChild(dayElem)
    })
    
    this.#container.appendChild(weekdaysRow)
  }

  #renderDays(monthData) {
    const daysGrid = document.createElement('div')
    daysGrid.className = 'days-grid'
    
    // Tomma celler före första dagen
    for (let i = 0; i < monthData.firstDayOfWeek; i++) {
      const emptyCell = document.createElement('div')
      emptyCell.className = 'day-cell empty'
      daysGrid.appendChild(emptyCell)
    }
    
    // Alla dagar
    monthData.days.forEach(day => {
      const dayCell = document.createElement('div')
      dayCell.className = 'day-cell'
      dayCell.style.backgroundColor = day.color || '#fff'
      
      const dateElem = document.createElement('div')
      dateElem.className = 'date'
      dateElem.textContent = day.date.getDate()
      dayCell.appendChild(dateElem)
      
      // Aktiviteter
      if (day.activities && day.activities.length > 0) {
        const activitiesList = document.createElement('ul')
        activitiesList.className = 'activities-list'
        
        day.activities.forEach(activity => {
          const activityItem = document.createElement('li')
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