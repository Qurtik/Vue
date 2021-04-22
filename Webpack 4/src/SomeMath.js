
function sum(...numbers){
	let sum = 0;

	for(let i = 0; i < numbers.length; i++){
		sum += numbers[i];
	}

	return sum;
}

class SomeMath{
	avg(...numbers){
		return sum(...numbers) / numbers.length;
	}

	max(...numbers){
		let max = 0;

		for(let i = 0;i < numbers.length; i++){
			if(numbers[i] > max){
				max = numbers[i];
			}
		}

		return max;
	}

	merge(a,b){ // деструкторизация объекта
		console.log(a);
		return{
			...a,
			...b
		}
	}
}

export default new SomeMath();