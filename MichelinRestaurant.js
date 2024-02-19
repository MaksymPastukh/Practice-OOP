import { Restaurant } from './Restaurant.js'

export class MichelinRestaurant extends Restaurant {
	constructor(
		name,
		address,
		cuisine,
		mainChef,
		rating,
		openingTime,
		closingTime
	) {
		super(name, address, cuisine, openingTime, closingTime)
		this.mainChef = mainChef
		this.rating = rating
		this.reservations = []
	}

	getInfo() {
		return `${super.getInfo()}, Ресторан Michelin: ${this.getMichelinInfo()}`
	}

	getMichelinInfo() {
		return `Рейтинг заведения: ${this.rating}. Главный повар: ${this.mainChef}`
	}
}
