import { FoodPlace } from './FoodPlace.js'
import { Reservations } from './Reservations.js'

// Класс ресторана наследует все свойства и методы класса FoodPlace и добавляет свои собственные
export class Restaurant extends FoodPlace {
	constructor(name, address, cuisine, openingTime, closingTime) {
		super(name, address, 'Ресторан', openingTime, closingTime)
		this.cuisine = cuisine
		this.reservations = []
	}

	// Переопределение метода родительского класса
	getInfo() {
		// Вызов метода родительского класса и добавление новой информации к методу родительского класса
		return `${super.getInfo()}, Кухня: ${this.cuisine}`
	}

	// Добавление метода для бронирования
	addReservation(reservations) {
		// Проверка, что аргумент является экземпляром класса Reservations
		if (reservations instanceof Reservations) {
			// Пушим бронирования в массив
			this.reservations.push(reservations)
		}
	}

	// Вывод всех бронирований
	showReservations() {
		console.log(`Бронирование ${this.name}`)
		// Проходимся по массиву бронирований и выводим в консоль
		this.reservations.forEach((item, index) => {
			console.log(`${index + 1}. ${item.name} - ${item.time}`)
		})
	}
}
