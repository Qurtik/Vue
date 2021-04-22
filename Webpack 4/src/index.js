// Перед импортом jquery необходимо установить через npm: npm i jquery --save
import $ from 'jquery';
// При подключении своих локальный .js файлов, мы указываем путь, например: ./some.js
// В случае jquery нужно просто импортировать jquery (имя модуля). Т.к. она лежит уже в папке node_modules
import avg from './some.js';
import someMath from './SomeMath.js'

$('.title').html('Some text!');
$('.avg').html(avg(1,4,8));
$('.avg').html(someMath.avg(1,4,8));
$('.max').html(someMath.max(1,4,8,9));
console.log(someMath.merge({
	a: 1
},{
	b: 2
}));

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
//console.log(avg(1,4,8));