export class FoodPlace {
	#workingTime = {
		openingTime: '09:00',
		closingTime: '22:00',
	}

	constructor(name, address, type, openingTime, closingTime) {
		this.name = name
		this.address = address
		this.type = type
		this.menu = []
		if (openingTime) {
			this.#workingTime.openingTime = openingTime
		}
		if (closingTime) {
			this.#workingTime.closingTime = closingTime
		}
	}

	get workingTime() {
		return `${this.#workingTime.openingTime} - ${this.#workingTime.closingTime}`
	}

	set workingTime(times) {
		if (typeof times === 'object' && times.openingTime && times.closingTime) {
			this.#workingTime.openingTime = times.openingTime
			this.#workingTime.closingTime = times.closingTime
		}
	}

	addToMenu(item) {
		if (typeof item === 'object' && item.name && item.price) {
			this.menu.push(item)
		}
	}

	showMenu() {
		console.log(`Menu for ${this.name}`)
		this.menu.forEach((item, index) => {
			console.log(`${index + 1}. ${item.name} - ${item.price}`)
		})
	}

	getInfo() {
		return `Название: ${this.name},  Расположение: ${this.address}, Время работы: ${this.workingTime}`
	}

	isOpen() {
		const currentTime = new Date().getHours()
		const openingHour = parseInt(this.#workingTime.openingTime.split(':')[0])
		const closingHour = parseInt(this.#workingTime.closingTime.split(':')[0])

		return currentTime >= openingHour && currentTime < closingHour
	}
}
