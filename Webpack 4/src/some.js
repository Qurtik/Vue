// Стороняя библиотека, полученая от стороннего ресурса

// Приватная функция. К ней доступа нет.
function sum(...numbers){
	let sum = 0;

	for(let i = 0; i < numbers.length; i++){
		sum += numbers[i];
	}

	return sum;
}

//Публичная функция. Используется для работы.
function avg(...numbers){
	return sum(...numbers) / numbers.length;
}

// Весь файл some.js - модуль
// При подключении будет доступна только функция avg
// Все остальное осталось бы скрытой частью
export default avg; 