import { FoodPlace } from './FoodPlace.js'

export class CoffeeShop extends FoodPlace {
	#specialOffer = ''
	constructor(name, address, seatingCapacity = 10, openingTime, closingTime) {
		super(name, address, 'Кофейня', openingTime, closingTime)
		this.seatingCapacity = seatingCapacity
	}

	set specialOffer(offer) {
		this.#specialOffer = offer
	}

	get specialOffer() {
		if (this.#specialOffer) {
			return `Специальное предложение в ${this.name}: ${this.#specialOffer}`
		} else {
			return `Специальное предложения в ${this.name}: на данный момент нет`
		}
	}

	getInfo() {
		return `${super.getInfo()}, Количество мест:
		 ${this.seatingCapacity}, ${this.specialOffer}`
	}
}
