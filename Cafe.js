import { FoodPlace } from './FoodPlace.js'

// Класс кафе наследует все свойства и методы класса FoodPlace
export class Cafe extends FoodPlace {
	constructor(name, address, openingTime, closingTime) {
		super(name, address, 'Cafe', openingTime, closingTime)
	}
}
