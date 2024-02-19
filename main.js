import {Cafe} from './Cafe.js'
import {CoffeeShop} from './CoffeeShop.js'
import {MichelinRestaurant} from './MichelinRestaurant.js'
import {Reservations} from './Reservations.js'
import {Restaurant} from './Restaurant.js'

// Используем Promise.all для получения данных из всех JSON-файлов одновременно
Promise.all(
  [
    'cafes.json',
    'coffee-shops.json',
    'restaurants.json',
    'michelin-restaurants.json',
  ]
    // Используем метод map для создания массива промисов на основе массива с названиями файлов
    .map(url => fetch('/data/' + url).then(response => response.json()))
)
  // Получаем массив данных из JSON-файлов и обрабатываем их
  .then(dataArray => {
    // Вызываем функцию processData и передаем в нее массив данных
    processData(dataArray)
  })
  // Если возникла ошибка, выводим ее в консоль
  .catch(error => console.log(error))

// Типы заведений для функции generateTableForFood
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

  // Создаем таблицу на основе обработанных данных.
  // Вызываем метод generateTableForFood для каждого типа заведения (передавая туда массив с данными и тип заведения)
  generateTableForFood(foodPlaces.cafes, TYPE_CAFE)
  generateTableForFood(foodPlaces.cafeShops, TYPE_CAFE_SHOP)
  generateTableForFood(foodPlaces.restaurants, TYPE_RESTAURANT)
  generateTableForFood(foodPlaces.michelinRestaurants, TYPE_RESTAURANT_MICHELIN)
}

function processCafes(cafes) {
  // Проходимся по массиву данных для кафе
  cafes.forEach(item => {
    // Для каждого элемента массива создаем экземпляр класса Cafe
    const cafe = new Cafe(
      // При создании экземпляра передаем в конструктор данные из JSON-файла
      item.name,
      item.address,
      item.openingTime,
      item.closingTime
    )
    // Проходимся циклом по массиву меню
    item.menu.forEach(menuElement => {
      // Вызываем метод addToMenu для каждого элемента меню и передаем в него объект с данными
      cafe.addToMenu({name: menuElement.name, price: menuElement.price})
    })
    // Добавляем созданный экземпляр в массив cafes
    foodPlaces.cafes.push(cafe)
  })
}

function processCafesShop(cafeShops) {
  // Проходимся циклом по массиву данных для кофейни
  cafeShops.forEach(item => {
    // Для каждого элемента массива создаем экземпляр класса CoffeeShop
    const cafeShop = new CoffeeShop(
      // Добавляем в конструктор данные из JSON-файла
      item.name,
      item.address,
      (item.seatingCapacity = 10),
      item.openingTime,
      item.closingTime
    )
    // Проходимся циклом по массиву меню и добавляем каждый элемент в меню кофейни
    item.menu.forEach(menuElement => {
      cafeShop.addToMenu({name: menuElement.name, price: menuElement.price})
    })
    // Проверяем есть ли у кофейни специальное предложение и добавляем его в объект
    if (item.specialOffer) {
      cafeShop.specialOffer = item.specialOffer
    }
    // Добавляем созданный экземпляр в массив cafeShops
    foodPlaces.cafeShops.push(cafeShop)
  })
}

function processRestaurants(restaurants) {
  // Проходимся циклом по массиву данных для ресторанов
  restaurants.forEach(item => {
    // Для каждого элемента массива создаем экземпляр класса Restaurant
    const restaurant = new Restaurant(
      // Добавляем в конструктор данные из JSON-файла
      item.name,
      item.address,
      item.cuisine,
      item.openingTime,
      item.closingTime
    )
    // Проходимся циклом по массиву меню и добавляем каждый элемент в меню ресторана
    item.menu.forEach(menuElement => {
      restaurant.addToMenu({name: menuElement.name, price: menuElement.price})
    })
    // Проходимся циклом по массиву бронирования и добавляем каждый элемент в бронирование ресторана
    item.reservations.forEach(reservationItem => {
      // Создаем экземпляр класса Reservations и передаем в конструктор данные из JSON-файла
      restaurant.addReservation(
        new Reservations(reservationItem.name, reservationItem.time)
      )
    })
    // Добавляем созданный экземпляр в массив restaurants
    foodPlaces.restaurants.push(restaurant)
  })
}

function processMichelinRestaurants(michelinRestaurants) {
  // Проходимся циклом по массиву данных для ресторанов мишлен
  michelinRestaurants.forEach(item => {
    // Для каждого элемента массива создаем экземпляр класса MichelinRestaurant
    const restaurantMichelin = new MichelinRestaurant(
      // Добавляем в конструктор данные из JSON-файла
      item.name,
      item.address,
      item.cuisine,
      item.mainChef,
      item.rating,
      item.openingTime,
      item.closingTime
    )
    // Проходимся циклом по массиву меню и добавляем каждый элемент в меню ресторана
    item.menu.forEach(menuElement => {
      restaurantMichelin.addToMenu({
        name: menuElement.name,
        price: menuElement.price,
      })
    })
    // Проходимся циклом по массиву бронирования и добавляем каждый элемент в бронирование ресторана
    item.reservations.forEach(reservationItem => {
      // Создаем экземпляр класса Reservations и передаем в конструктор данные из JSON-файла
      restaurantMichelin.addReservation(
        new Reservations(reservationItem.name, reservationItem.time)
      )
    })
    // Добавляем созданный экземпляр в массив michelinRestaurants
    foodPlaces.michelinRestaurants.push(restaurantMichelin)
  })
}

// В этой функции мы создаем таблицу на основе данных, которые мы получили из JSON-файлов.
// Мы создаем строки и ячейки для каждого элемента массива данных и добавляем их в таблицу.
// Используем метод insertRow и insertCell для создания строк и ячеек.

// В функцию мы передаем два параметра: массив с данными и тип заведения.
function generateTableForFood(data, type) {
  // Получаем тело таблицы по id
  const tableBody = document.getElementById(type + '-tb')
  // Проходимся циклом по массиву данных и создаем строки и ячейки для каждого элемента массива
  data.forEach((foodPlaces, i) => {
    // Создаем строку и добавляем ее в тело таблицы
    const row = tableBody.insertRow()
    // Создаем ячейки и добавляем их в строку
    row.insertCell().innerText = i + 1
    row.insertCell().innerText = foodPlaces.name
    row.insertCell().innerText = foodPlaces.address
    row.insertCell().innerText = foodPlaces.workingTime

    // Если тип заведения кафе или ресторан, то добавляем в таблицу тип кухни
    if (type === TYPE_RESTAURANT || type === TYPE_RESTAURANT_MICHELIN) {
      row.insertCell().innerText = foodPlaces.cuisine
    }

    // Создаем список для меню и добавляем его в ячейку
    let ul = document.createElement('ul')
    // Проходимся циклом по массиву меню и добавляем каждый элемент в список
    foodPlaces.menu.forEach(element => {
      const li = document.createElement('li')
      li.innerText = element.name + ' - ' + element.price + ' $'
      ul.appendChild(li)
    })

    // Добавляем список в ячейку таблицы
    row.insertCell().appendChild(ul)

    // Если тип заведения ресторан или ресторан мишлен, то добавляем в таблицу бронирование
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

    // Добавляем в таблицу информацию о том, открыто ли заведение используя метод isOpen и тернарный оператор
    row.insertCell().innerText = foodPlaces.isOpen() ? 'Да' : 'Нет'
  })
}
