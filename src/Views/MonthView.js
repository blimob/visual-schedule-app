export class MonthView {
  #container

  constructor(container) {
    this.#container = container
  }

  render(monthData) {
    this.#container.innerHTML = ''
    this.#renderWeekdayHeaders()
    this.#renderDays(monthData)
  }

  #renderWeekdayHeaders() {
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
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
    
    for (let i = 0; i < monthData.firstDayOfWeek; i++) {
      const emptyCell = document.createElement('div')
      emptyCell.className = 'day-cell empty'
      daysGrid.appendChild(emptyCell)
    }
    
    monthData.days.forEach(day => {
      const dayCell = document.createElement('div')
      dayCell.className = 'day-cell'
      dayCell.style.backgroundColor = day.color || '#fff'
      dayCell.style.cursor = 'pointer'
  
      dayCell.addEventListener('click', (e) => {
        // Förhindra att modal öppnas om man klickar på delete-knapp
        if (!e.target.classList.contains('delete-activity-btn')) {
          this.#onDayClick(day.date)
        }
      })
      
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
          activityItem.className = 'activity-item'
          
          const icon = activity.visual?.icon || ''
          const activityText = document.createElement('span')
          activityText.textContent = `${icon} ${activity.name}`
          activityItem.appendChild(activityText)
          
          // Delete-knapp
          const deleteBtn = document.createElement('button')
          deleteBtn.className = 'delete-activity-btn'
          deleteBtn.textContent = '×'
          deleteBtn.title = 'Delete activity'
          
          deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation() // Förhindra att dag-click triggas
            this.#onDeleteActivity(activity, day.date)
          })
          
          activityItem.appendChild(deleteBtn)
          activitiesList.appendChild(activityItem)
        })
        
        dayCell.appendChild(activitiesList)
      }
      
      daysGrid.appendChild(dayCell)
    })
    
    this.#container.appendChild(daysGrid)
  }

  #onDeleteActivity(activity, date) {
    // Trigga en custom event som Controller kan lyssna på
    const event = new CustomEvent('deleteactivity', { 
      detail: { activity, date },
      bubbles: true
    })
    this.#container.dispatchEvent(event)
  }

  #onDayClick(date) {
    const event = new CustomEvent('dayclick', { 
      detail: { date },
      bubbles: true
    })
    this.#container.dispatchEvent(event)
  }
}
