/* */
v-model:

v-on:input="name = $event.target.value"
v-bind:value="name"
/* */

/* ************************************************************************************************** */
/* Обращение к объекту Vue через функцию, котрая не входит во вью */
<script>

let sample = new Vue({
	el: '.sample',
	data:{
		name:''
	}
});

window.addEventListener('resize', function(){
	sample.name = ''; // Обращение к объекту Vue
})
</script>

/* */
{{ fullName() }} // - если methods
{{ fullName }} // - если computed

<script>

let sample = new Vue({
	el: '.sample',
	data:{
		firstName:'',
		lastName:''

	},
	methods:{
		fullName(){
			return this.firstName + ' ' + this.lastName;
		}
	},
	computed:{ // используется на основе предыдущих расчетов
		fullName(){
			return this.firstName + ' ' + this.lastName;
		}
	},
	watch:{ // Можно использовать вместо computed (Отслеживания изменение значения переменной) 
		// Указываем поля, которые хотим прослушать
		firstName(){
			// При изменении firstName будет происхоидить:
			this.fullName = this.firstName + ' ' + this.lastName;
		},
		lastName(){
			// При изменении lastName будет происхоидить:
			this.fullName = this.firstName + ' ' + this.lastName;
		}
	}
});

</script>
/* ************************************************************************************************** */


/* ************************************************************************************************** */
 // Использование watch с ajax
<script>

function getSale(code, callback){
	let codes = {
		newYear: 10,
		some:20
	};

let sale = (codes[code] !== undefined) ? codes[code] : 0;

	setTimeout(() => { // Имитация ajax запроса
		callback(sale);
	},500);
	return sale;
}

let sample = new Vue({
	el: '.sample',
	data:{
		firstName: '',
		lastName: '',
		promo: '',
		showText: true,
		sale: 0

	},
	computed:{ // используется на основе предыдущих расчетов
		sale(){
			getSale(this.promo);
		}
	},
	watch:{ // Можно использовать вместо computed (Отслеживания изменение значения переменной) 
		// Указываем поля, которые хотим прослушать
		promo(){
			// let content = this; // - если бы прередавали обычную функцию
			getSale(this.promo, (sale) => // function(sale) или (sale) =>
			{
				this.sale = sale;
			})
		}
		
	}
});

</script>
/* ************************************************************************************************** */

/* ************************************************************************************************** */
/* // Цикл

<button @click="addNumber"></button>
<button @click="sortNumbers"></button>
<ul>
	<!-- Т.к. массив, то можно только 2 значения. Если был бы объект, то можно было бы еще получить ключь -->
	<li v-for="(number, index) in numbers" 
	    v-on:mouseenter="$event.target.style.color = 'red'" 
	    @mouseleave="onMouseLeave($event, index)"> <!-- Равносильные события -->
	    {{ number }}
	</li>
<!-- Перебор объекта -->
	<li v-for="(value, key, index) in info" :key="key">
	    {{ value }} - {{ key }} - {{ index }}
	</li>

</ul>

<script>
let sample = new Vue({
	el: '.sample',
	data:{
		numbers: [],
		info: {
			name: 'Vlad',
			email: 'vladislav.selezov@sgs.com'
		}
	},
	computed:{ // используется на основе предыдущих расчетов
		addNumber(){
			this.numbers.push(Math.floor(Math.random() * 10));
		},
		sortNumbers(){
			this.numbers.sort((a,b) => {
				return a > b ? 1 : -1;
			});
		},
		onMouseLeave(e,index){
			e.target.style.color = 'black'
		}

	}
});
</script>
/* ************************************************************************************************** */

/* ************************************************************************************************** */
// Добавление рективных данных объекту - объекты не реактивны на добавлние новых свойств

<div v-for="(guest, key, index) in guests" :key="key">

</div>

<script>
let sample = new Vue({
	el: '.sample',
	data:{
		numbers: [],
		info: {
			formSubmited: false,
			email: '',
			phone: '',
			guests: {},
			guestIterator: 0
		}
	},
	computed:{ // используется на основе предыдущих расчетов
		addGuest(){
			this.guestIterator++;
			//this.guests[this.guestIterator] = ''; - не реактивно
			this.$set(this.guests, this.guestIterator, ''); // - реактивно - this.$set
		},
		deleteGuest(index){
			// delete this.guests[index]; // - не реактивно
			this.$delete(this.guests, index);
		}

	}
});
</script>
/* ************************************************************************************************** */


/* ************************************************************************************************** */
// Создание директивы v-ondelay

<div class=wrapper>
	<div class="sample">
		<h2> {{ clicks }} </h2>
		<hr>
		<button class="btn btn-success"
		       @click.prevent="onClick">
	</div>
</div>

<script>

Vue.directive('ondelay',{
		bind(el, options){//Хук bind
			let timer;
			let timeout = 0;

			for(let name in options.modifiers){
					if(!isNaN(+name)){
						timeout = parseInt(name);
					}
				}

			console.log(timeout);
			


			let callback = (e) => {
				if(timer !== undefined){
					clearInterval(timer);
				}

				if(options.modifiers.prevent){
				e.preventDefault();
			}

				setTimeout(() => {
					options.value.call(this, e);
				}, timeout)
				
			};

			el.addEventListener(options.arg, callback)
			console.log(options);
		}
	});

let sample = new Vue({
	el: '.sample',
	data:{
		clicks: 0
	},
	methods:{
		onClick(){
			this.clicks++;
		}
	},
	computed:{

	}
});
</script>
/* ************************************************************************************************** */


/* ************************************************************************************************** */
// Создание компонентов

<div class=wrapper>
	<div class="sample">
		<app-some v-for="(elem,index) in values" :key="index"
				  :min="elem.min"
				  :max="elem.max"
				  @plusplus="onPlusPlus(index)"
				  > 
		</app-some>
	</div>
</div>

<script>

//Глобальное создание компонента
	Vue.component('app-some', {
		props:['min','max'],
		template: `
		<div>
			<h2>{{ number }}</h2>
			<button class="btn btn-primary" @click="onClick">+</button>
			<hr>
		</div>
		`,
		data(){ // data объявляется по другому - без {} скобок
			return {
				//number: Math.floor(Math.random() * (this.max - this.min)) + this.min // data генерируется 1 раз. Только при создании компонента
			}
		},
		methods:{
			onClick(e){
				this.$emit('plusplus'); // $emit - генерирует событие отправляющиеся родительскому элементу. Используется для запуска родительского события. Используем в виде @plusplus в компоненте в виде события. onPlusPlus - это событие родителя.
				// this.min += 5; // Так делать нельзя - выдаст ошибку. Нужно вызвать событие у родителя при помощи "$emit" и изменить данные на стороне родителя
				// this.max += 5; 
			}
		},
		computed:{
			number(){
				return Math.floor(Math.random() * (this.max - this.min)) + this.min
			}
		}
	});

let sample = new Vue({
	el: '.sample',
	data:{
		values: [
			{
				min: 1,
				max: 5
			},
			{
				min: 5,
				max: 10
			},
			{
				min: 10,
				max: 15
			}
		]
	},
	methods: {
		onPlusPlus(index){
			console.log(index);
			this.values[index].min += 5;
			this.values[index].max += 5;

		}
	}
});
</script>
/* ************************************************************************************************** */


/* ************************************************************************************************** */
// props

<div class=wrapper>
	<div class="sample">
		<app-some :a="1" :b="1" :c="1"> 
			{{ a }}
			{{ b }}
			{{ c }}
		</app-some>
	</div>
</div>

<script>

	Vue.component('app-some', {
		props:{
			//a: null // Любой тип данных
			a: Number
			b:[Number,String] //  Строка или число
			c: {
				type:Number,
				required: true, // обязательная передача данных в компонент
				default: 5 // Значение по умолчанию, если н6е передали параметр
			},
			d: {
				type: Object,
				default(){
					return {
						a : 1 // Значение по умолчанию в объекте
					}
				}
			},
			e: {
				validator(val){
					return val >= 1 && val <= 10; // Свой валидатор
				}
			}
		},
	});

let sample = new Vue({
	el: '.sample',
	data:{

	},
	methods:{
	}
});
</script>
/* ************************************************************************************************** */



/* ************************************************************************************************** */
// component

<div class=wrapper>
	<div class="sample container">
		<button class="btn btn-primary" @click="ul = !ul"> Toggle</button>
		<hr/>
		<app-ul :items="list" v-if="ul"></app-ul>
		<app-ol :items="list" v-if="ul"></app-ol>
		<component :is="listType" :items="list"></component>
	</div>
</div>

<script>

	Vue.component('appUl', {
		props:{
			items: null
		},
		template: `
			<ul>
				<li v-for="item in items">
					{{ item }}
				</li>
			</ul>
		`
	});

	Vue.component('appOl', {
		props:{
			items: null
		},
		template: `
			<ol>
				<li v-for="item in items">
					{{ item }}
				</li>
			</ol>
		`
	});

let sample = new Vue({
	el: '.sample',
	data: {
		list: [
			'Some',
			'Items',
			'For',
			'List'
		],
		ul:true
	},
	computed: {
		listType(){
			return this.ul ? 'appUl' : 'appOl';
		}
	}
});
</script>
/* ************************************************************************************************** */

/* ************************************************************************************************** */
// keep-alive - предотвращает пересоздание объектов

<div class=wrapper>
	<div class="sample container">
		<button class="btn btn-primary" @click="ul = !ul"> Toggle</button>
		<hr/>
		<keep-alive>
			<app-ul :items="list" v-if="ul"></app-ul>
			<app-ol :items="list" v-if="ul"></app-ol>
		</keep-alive>
		<keep-alive>
		<component :is="listType" :items="list"></component>
		</keep-alive>
	</div>
</div>

<script>

	Vue.component('appUl', {
		props:{
			items: null
		},
		template: `
			<ul>
				<li v-for="item in items">
					{{ item }}
				</li>
			</ul>
		`
	});

	Vue.component('appOl', {
		props:{
			items: null
		},
		template: `
			<ol>
				<li v-for="item in items">
					{{ item }}
				</li>
			</ol>
		`
	});

let sample = new Vue({
	el: '.sample',
	data: {
		list: [
			'Some',
			'Items',
			'For',
			'List'
		],
		ul:true
	},
	computed: {
		listType(){
			return this.ul ? 'appUl' : 'appOl';
		}
	}
});
</script>
/* ************************************************************************************************** */