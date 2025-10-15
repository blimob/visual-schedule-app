export class ActivityFormView {
  #model
  #form
  #onSubmitCallback

  constructor() {
    this.#model = document.getElementById('activity-model')
    this.#form = document.getElementById('activity-form')
    this.#setupEventListeners()
  }

  show(date) {
    this.#form.dataset.date = date.toISOString()

    this.#model.classList.remove('hidden')
  }

  hide() {
    this.#model.classList.add('hidden')
    this.#form.reset()
  }

  onSubmit(callback) {
    this.#onSubmitCallback = callback
  }

  #setupEventListeners() {
    this.#form.addEventListener('submit', (e) => {
      e.preventDefault()

      const formData = {
        date: new Date(this.#form.dataset.date),
        name: document.getElementById('activity-name').value,
        startTime: document.getElementById('activity-start-time').value,
        endTime: document.getElementById('activity-end-time').value,
        icon: document.getElementById('activity-icon').value,
      }
      if (this.#onSubmitCallback) {
        this.#onSubmitCallback(formData)
      }

      const cancelbutton = this.#model.querySelector('.cancel-button')
      cancelbutton.addEventListener('click', () => this.hide())
    })

    const closebutton = this.#model.querySelector('.close-button')
    closebutton.addEventListener('click', () => this.hide())
  }

  this.#model.addEventListener('click', (e) => {
    if (e.target === this.#model) {
      this.hide()
    }
  })
}