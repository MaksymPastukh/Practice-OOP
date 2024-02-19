import { Cafe } from './Cafe.js'
import { CoffeeShop } from './CoffeeShop.js'
import { MichelinRestaurant } from './MichelinRestaurant.js'
import { Reservations } from './Reservations.js'
import { Restaurant } from './Restaurant.js'

// Мы используем fetch для получения данных из JSON-файлов. Мы передаем массив с именами файлов, которые мы хотим получить, в метод fetch. Метод fetch возвращает промис, который мы обрабатываем с помощью метода then. В метод then мы передаем функцию, которая принимает response в качестве аргумента. Мы вызываем метод json для объекта response, чтобы получить данные в формате JSON. Метод json также возвращает промис, который мы обрабатываем с помощью метода then. В метод then мы передаем функцию, которая принимает данные в формате JSON в качестве аргумента. Мы вызываем метод processData и передаем в него массив с данными.

Promise.all(
	[
		'cafes.json',
		'coffee-shops.json',
		'restaurants.json',
		'michelin-restaurants.json',
	].map(url => fetch('/data/' + url).then(response => response.json()))
)
	.then(dataArray => {
		processData(dataArray)
	})
	.catch(error => console.log(error))

const TYPE_CAFE = 'cafe'
const TYPE_RESTAURANT = 'restaurant'
const TYPE_RESTAURANT_MICHELIN = 'michelin-restaurant'
const TYPE_CAFE_SHOP = 'cafe-shop'

// После получения всех данных мы их сохраняем в объекте foodPlaces. На основе этого объекта мы создаем таблицу.

const foodPlaces = {
	cafes: [],
	cafeShops: [],
	restaurants: [],
	michelinRestaurants: [],
}

function processData(data) {
	// Получаем данные из JSON-файлов и обрабатываем их
	processCafes(data[0])
	processCafesShop(data[1])
	processRestaurants(data[2])
	processMichelinRestaurants(data[3])

	// Создаем таблицу на основе обработанных данных
	// Вызываем метод generateTableForFood для каждого типа заведения (передавая туда тип заведения и массив с данными)
	generateTableForFood(foodPlaces.cafes, TYPE_CAFE)
	generateTableForFood(foodPlaces.cafeShops, TYPE_CAFE_SHOP)
	generateTableForFood(foodPlaces.restaurants, TYPE_RESTAURANT)
	generateTableForFood(foodPlaces.michelinRestaurants, TYPE_RESTAURANT_MICHELIN)
}

function processCafes(cafes) {
	cafes.forEach(item => {
		const cafe = new Cafe(
			item.name,
			item.address,
			item.openingTime,
			item.closingTime
		)
		item.menu.forEach(menuElement => {
			cafe.addToMenu({ name: menuElement.name, price: menuElement.price })
		})
		foodPlaces.cafes.push(cafe)
	})
}

function processCafesShop(cafeShops) {
	cafeShops.forEach(item => {
		const cafeShop = new CoffeeShop(
			item.name,
			item.address,
			(item.seatingCapacity = 10),
			item.openingTime,
			item.closingTime
		)
		item.menu.forEach(menuElement => {
			cafeShop.addToMenu({ name: menuElement.name, price: menuElement.price })
		})
		if (item.specialOffer) {
			cafeShop.specialOffer = item.specialOffer
		}
		foodPlaces.cafeShops.push(cafeShop)
	})
}

function processRestaurants(restaurants) {
	restaurants.forEach(item => {
		const restaurant = new Restaurant(
			item.name,
			item.address,
			item.cuisine,
			item.openingTime,
			item.closingTime
		)
		item.menu.forEach(menuElement => {
			restaurant.addToMenu({ name: menuElement.name, price: menuElement.price })
		})
		item.reservations.forEach(reservationItem => {
			restaurant.addReservation(
				new Reservations(reservationItem.name, reservationItem.time)
			)
		})
		foodPlaces.restaurants.push(restaurant)
	})
}

function processMichelinRestaurants(michelinRestaurants) {
	michelinRestaurants.forEach(item => {
		const restaurantMichelin = new MichelinRestaurant(
			item.name,
			item.address,
			item.cuisine,
			item.mainChef,
			item.rating,
			item.openingTime,
			item.closingTime
		)
		item.menu.forEach(menuElement => {
			restaurantMichelin.addToMenu({
				name: menuElement.name,
				price: menuElement.price,
			})
		})
		item.reservations.forEach(reservationItem => {
			restaurantMichelin.addReservation(
				new Reservations(reservationItem.name, reservationItem.time)
			)
		})
		foodPlaces.michelinRestaurants.push(restaurantMichelin)
	})
}

// В этой функции мы создаем таблицу на основе данных, которые мы получили из JSON-файлов. Мы создаем строки и ячейки для каждого элемента массива данных и добавляем их в таблицу. Используем метод insertRow и insertCell для создания строк и ячеек.
function generateTableForFood(data, type) {
	const tableBody = document.getElementById(type + '-tb')
	data.forEach((foodPlaces, i) => {
		const row = tableBody.insertRow()
		row.insertCell().innerText = i + 1
		row.insertCell().innerText = foodPlaces.name
		row.insertCell().innerText = foodPlaces.address
		row.insertCell().innerText = foodPlaces.workingTime

		if (type === TYPE_RESTAURANT || type === TYPE_RESTAURANT_MICHELIN) {
			row.insertCell().innerText = foodPlaces.cuisine
		}

		let ul = document.createElement('ul')
		foodPlaces.menu.forEach(element => {
			const li = document.createElement('li')
			li.innerText = element.name + ' - ' + element.price + ' $'
			ul.appendChild(li)
		})

		row.insertCell().appendChild(ul)

		if (type === TYPE_RESTAURANT || type === TYPE_RESTAURANT_MICHELIN) {
			let ul = document.createElement('ul')
			foodPlaces.reservations.forEach(item => {
				const li = document.createElement('li')
				li.innerText = item.name + ' - ' + item.time
				ul.appendChild(li)
			})

			row.insertCell().appendChild(ul)
		}

		if (type === TYPE_RESTAURANT_MICHELIN) {
			row.insertCell().innerText = foodPlaces.rating
			row.insertCell().innerText = foodPlaces.mainChef
		}
		if (type === TYPE_CAFE_SHOP) {
			row.insertCell().innerText = foodPlaces.seatingCapacity
			row.insertCell().innerText = foodPlaces.specialOffer
		}

		row.insertCell().innerText = foodPlaces.isOpen() ? 'Да' : 'Нет'
	})
}
