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

  // HEADER
  #renderWeekdayHeaders() {
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const row = document.createElement('div')
    row.className = 'weekdays-row'

    weekdays.forEach(day => row.appendChild(this.#createWeekdayHeader(day)))
    this.#container.appendChild(row)
  }

  #createWeekdayHeader(day) {
    const elem = document.createElement('div')
    elem.className = 'weekday-header'
    elem.textContent = day
    return elem
  }

  // DAYS
  #renderDays(monthData) {
    const grid = document.createElement('div')
    grid.className = 'days-grid'

    this.#addEmptyCells(grid, monthData.firstDayOfWeek)
    monthData.days.forEach(day => grid.appendChild(this.#createDayCell(day)))

    this.#container.appendChild(grid)
  }

  #addEmptyCells(grid, count) {
    for (let i = 0; i < count; i++) {
      const empty = document.createElement('div')
      empty.className = 'day-cell empty'
      grid.appendChild(empty)
    }
  }

  #createDayCell(day) {
    const cell = document.createElement('div')
    cell.className = 'day-cell'
    cell.style.backgroundColor = day.color || '#fff'
    cell.style.cursor = 'pointer'

    cell.addEventListener('click', (e) => {
      if (!e.target.classList.contains('delete-activity-btn')) {
        this.#onDayClick(day.date)
      }
    })

    cell.appendChild(this.#createDateLabel(day.date))

    if (day.activities?.length) {
      const list = this.#createActivitiesList(day)
      cell.appendChild(list)
    }

    return cell
  }

  #createDateLabel(date) {
    const label = document.createElement('div')
    label.className = 'date'
    label.textContent = date.getDate()
    return label
  }

  // ACTIVITIES
  #createActivitiesList(day) {
    const list = document.createElement('ul')
    list.className = 'activities-list'

    day.activities.forEach(activity => list.appendChild(this.#createActivityItem(activity, day.date)))
    return list
  }

  #createActivityItem(activity, date) {
    const item = document.createElement('li')
    item.className = 'activity-item'

    const icon = activity.visual?.icon || ''
    const text = document.createElement('span')
    text.textContent = `${icon} ${activity.name}`
    item.appendChild(text)

    const deleteBtn = this.#createDeleteButton(activity, date)
    item.appendChild(deleteBtn)

    return item
  }

  #createDeleteButton(activity, date) {
    const btn = document.createElement('button')
    btn.className = 'delete-activity-btn'
    btn.textContent = '×'
    btn.title = 'Delete activity'

    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      this.#onDeleteActivity(activity, date)
    })

    return btn
  }

  // EVENTS
  #onDeleteActivity(activity, date) {
    this.#dispatchCustomEvent('deleteactivity', { activity, date })
  }

  #onDayClick(date) {
    this.#dispatchCustomEvent('dayclick', { date })
  }

  #dispatchCustomEvent(name, detail) {
    const event = new CustomEvent(name, { detail, bubbles: true })
    this.#container.dispatchEvent(event)
  }
}