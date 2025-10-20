export class ActivityFormView {
  #modal
  #form
  #onSubmitCallback

  constructor() {
    this.#modal = document.getElementById('activity-modal')
    this.#form = document.getElementById('activity-form')
    this.#setupEventListeners()
  }

  show(date) {
    this.#form.dataset.date = date.toISOString()
    this.#updateWeekdayLabel(date)
    this.#modal.classList.remove('hidden')
  }

  hide() {
    this.#modal.classList.add('hidden')
    this.#form.reset()
    this.#resetFormState()
  }

  onSubmit(callback) {
    this.#onSubmitCallback = callback
  }

  getFormData() {
    const allDay = document.getElementById('activity-allday').checked
    
    return {
      date: new Date(this.#form.dataset.date),
      name: document.getElementById('activity-name').value,
      startTime: allDay ? '00:00' : document.getElementById('activity-start').value,
      endTime: allDay ? '23:59' : document.getElementById('activity-end').value,
      icon: document.getElementById('activity-icon').value,
      allDay: allDay,
      repeat: document.getElementById('activity-repeat').checked
    }
  }

  showError(message) {
    alert(message) // TODO: Replace with better UI
  }

  #updateWeekdayLabel(date) {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const weekdaySpan = document.getElementById('selected-weekday')
    if (weekdaySpan) {
      weekdaySpan.textContent = weekdays[date.getDay()]
    }
  }

  #resetFormState() {
    document.getElementById('activity-allday').checked = false
    document.getElementById('activity-repeat').checked = false
    document.getElementById('time-fields').classList.remove('hidden')
    
    const emojiDisplay = document.getElementById('selected-emoji-display')
    if (emojiDisplay) emojiDisplay.textContent = ''
  }

  #setupEventListeners() {
    this.#setupAllDayToggle()
    this.#setupEmojiPicker()
    this.#setupFormSubmit()
    this.#setupCloseButtons()
  }

  #setupAllDayToggle() {
    const checkbox = document.getElementById('activity-allday')
    const timeFields = document.getElementById('time-fields')
    
    checkbox?.addEventListener('change', () => {
      timeFields.classList.toggle('hidden', checkbox.checked)
      if (checkbox.checked) {
        document.getElementById('activity-start').value = ''
        document.getElementById('activity-end').value = ''
      }
    })
  }

  #setupEmojiPicker() {
    const picker = this.#modal.querySelector('emoji-picker')
    const input = document.getElementById('activity-icon')
    const display = document.getElementById('selected-emoji-display')
    
    picker?.addEventListener('emoji-click', (e) => {
      const emoji = e.detail.unicode
      input.value = emoji
      if (display) display.textContent = emoji
    })
  }

  #setupFormSubmit() {
    this.#form.addEventListener('submit', (e) => {
      e.preventDefault()
      if (this.#onSubmitCallback) {
        this.#onSubmitCallback(this.getFormData())
      }
      this.hide()
    })
  }

  #setupCloseButtons() {
    this.#modal.querySelector('.btn-cancel')?.addEventListener('click', () => this.hide())
    this.#modal.querySelector('.close-btn')?.addEventListener('click', () => this.hide())
    this.#modal.addEventListener('click', (e) => {
      if (e.target === this.#modal) this.hide()
    })
  }
}