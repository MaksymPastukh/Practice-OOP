import {FoodPlace} from './FoodPlace.js'

// Класс кофейни наследует все свойства и методы класса FoodPlace и добавляет свои собственные
export class CoffeeShop extends FoodPlace {
    // Специальное предложение в кофейне (по умолчанию пустая строка) - приватное свойство
    #specialOffer = ''

    constructor(name, address, seatingCapacity = 10, openingTime, closingTime) {
        super(name, address, 'Кофейня', openingTime, closingTime)
        // Количество мест в кофейне
        this.seatingCapacity = seatingCapacity
    }

    // Геттер и сеттер для специального предложения

    // Сеттер принимает аргумент offer и присваивает его приватному свойству #specialOffer
    set specialOffer(offer) {
        this.#specialOffer = offer
    }

    // Геттер проверяет есть ли специальное предложение и возвращает его
    get specialOffer() {
        if (this.#specialOffer) {
            return `Специальное предложение в ${this.name}: ${this.#specialOffer}`
        } else {
            return `Специальное предложения в ${this.name}: на данный момент нет`
        }
    }

    getInfo() {
        return `${super.getInfo()}, Количество мест: ${this.seatingCapacity}, ${this.specialOffer}`
    }
}
