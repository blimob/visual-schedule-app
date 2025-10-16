export class ActivityFormView {
  #modal
  #form
  #onSubmitCallback
  #selectedDate

  constructor() {
    this.#modal = document.getElementById('activity-modal')
    this.#form = document.getElementById('activity-form')
    this.#setupEventListeners()
  }

  show(date) {
    this.#selectedDate = date
    this.#form.dataset.date = date.toISOString()
    
    // Visa vilken veckodag som valts (för repeat)
    const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const weekdaySpan = document.getElementById('selected-weekday')
    if (weekdaySpan) {
      weekdaySpan.textContent = weekdayNames[date.getDay()]
    }
    
    this.#modal.classList.remove('hidden')
  }

  hide() {
    this.#modal.classList.add('hidden')
    this.#form.reset()
    
    // Reset checkboxes
    document.getElementById('activity-allday').checked = false
    document.getElementById('activity-repeat').checked = false
    document.getElementById('time-fields').classList.remove('hidden')
    
    const emojiDisplay = document.getElementById('selected-emoji-display')
    if (emojiDisplay) {
      emojiDisplay.textContent = ''
    }
  }

  onSubmit(callback) {
    this.#onSubmitCallback = callback
  }

  #setupEventListeners() {
    // All day checkbox
    const allDayCheckbox = document.getElementById('activity-allday')
    const timeFields = document.getElementById('time-fields')
    
    if (allDayCheckbox && timeFields) {
      allDayCheckbox.addEventListener('change', () => {
        if (allDayCheckbox.checked) {
          timeFields.classList.add('hidden')
          // Clear time fields
          document.getElementById('activity-start').value = ''
          document.getElementById('activity-end').value = ''
        } else {
          timeFields.classList.remove('hidden')
        }
      })
    }
    
    // Emoji picker
    const emojiPicker = this.#modal.querySelector('emoji-picker')
    const iconInput = document.getElementById('activity-icon')
    const emojiDisplay = document.getElementById('selected-emoji-display')
    
    if (emojiPicker) {
      emojiPicker.addEventListener('emoji-click', (event) => {
        const emoji = event.detail.unicode
        iconInput.value = emoji
        if (emojiDisplay) {
          emojiDisplay.textContent = emoji
        }
      })
    }
    
    // Submit form
    this.#form.addEventListener('submit', (e) => {
      e.preventDefault()
      
      const allDay = document.getElementById('activity-allday').checked
      const repeat = document.getElementById('activity-repeat').checked
      
      const formData = {
        date: new Date(this.#form.dataset.date),
        name: document.getElementById('activity-name').value,
        startTime: allDay ? '00:00' : document.getElementById('activity-start').value,
        endTime: allDay ? '23:59' : document.getElementById('activity-end').value,
        icon: document.getElementById('activity-icon').value,
        allDay: allDay,
        repeat: repeat
      }
      
      // Validation
      if (!allDay && (!formData.startTime || !formData.endTime)) {
        alert('Please fill in start and end time, or check "All day event"')
        return
      }
      
      if (this.#onSubmitCallback) {
        this.#onSubmitCallback(formData)
      }
      
      this.hide()
    })
    
    // Cancel button
    const cancelBtn = this.#modal.querySelector('.btn-cancel')
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        this.hide()
      })
    }
    
    // Close button (X)
    const closeBtn = this.#modal.querySelector('.close-btn')
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.hide()
      })
    }
    
    // Click outside modal
    this.#modal.addEventListener('click', (e) => {
      if (e.target === this.#modal) {
        this.hide()
      }
    })
  }
}