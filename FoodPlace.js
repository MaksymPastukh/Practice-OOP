// Класс FoodPlace для любого заведения питания

export class FoodPlace {
	// Устанавливаем приватное свойство workingTime
	#workingTime = {
		// Время открытия и закрытия заведения по умолчанию
		openingTime: '09:00',
		closingTime: '22:00',
	}

	constructor(name, address, type, openingTime, closingTime) {
		this.name = name
		this.address = address
		this.type = type
		this.menu = []
		// Делаем проверку, что если в конструкторе переданы время открытия и закрытия, то они перезаписывают значения по умолчанию
		if (openingTime) {
			this.#workingTime.openingTime = openingTime
		}
		if (closingTime) {
			this.#workingTime.closingTime = closingTime
		}
	}

	// Получение времени работы заведения
	get workingTime() {
		return `${this.#workingTime.openingTime} - ${this.#workingTime.closingTime}`
	}
	// Данным методом можно изменить время работы заведения
	set workingTime(times) {
		if (typeof times === 'object' && times.openingTime && times.closingTime) {
			this.#workingTime.openingTime = times.openingTime
			this.#workingTime.closingTime = times.closingTime
		}
	}

	// Добавление блюда в меню
	addToMenu(item) {
		// Проверка, что item является объектом и имеет свойства name и price
		if (typeof item === 'object' && item.name && item.price) {
			// Добавление обьект в массив меню
			this.menu.push(item)
		}
	}

	// Показать меню
	showMenu() {
		// Выводит в консоль меню заведения
		console.log(`Menu for ${this.name}`)
		// Перебор массива меню и вывод в консоль
		this.menu.forEach((item, index) => {
			// Вывод в консоль каждого элемента меню
			console.log(`${index + 1}. ${item.name} - ${item.price}`)
		})
	}

	// Получить информацию о заведении (название, адрес, время работы)
	getInfo() {
		return `Название: ${this.name},  Расположение: ${this.address}, Время работы: ${this.workingTime}`
	}

	// Проверка, открыто ли заведение (Возвращает true, если заведение открыто и false, если закрыто)
	isOpen() {
		// Получаем текущее время
		const currentTime = new Date().getHours()
		// Получаем часы открытия и закрытия заведения и преобразуем их в числовой формат parseInt.
		// Используем метод split для разделения строки на части по разделителю
		const openingHour = parseInt(this.#workingTime.openingTime.split(':')[0])
		const closingHour = parseInt(this.#workingTime.closingTime.split(':')[0])
		// Сравниваем текущее время с временем открытия и закрытия заведения, а так же возвращаем результат
		return currentTime >= openingHour && currentTime < closingHour
	}
}
