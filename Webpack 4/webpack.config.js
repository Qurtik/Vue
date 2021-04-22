// Подключение модуля path
let path = require('path');

// Подключаем extract-text-webpack-plugin
let ExtractTextPlugin = require("extract-text-webpack-plugin")

// Создаем объем, в котором описываем настройку webpack
// Создание папки dist (автоматически)

let conf = {
	entry:'./src/index.js', // указание начально скрипта
	output: // путь до итогового файла - dist
	{
		// папка куда мы кладем скрипт
		// путь должен быть относительный. Например от корня диска.
		// npm i path --seve-dev
		// path.resolve - соеденяет пути
		path: path.resolve(__dirname, './dist'), // ('./dist/' - не подойдет, выдаст ошибку. Т.к. этот путь не абсолютный)
		filename: 'main.js', // название файла
		publicPath: 'dist/' // относительная ссылка на файл, которым будет выполняться в браузере
	},
	devServer: {
		overlay: true // выводит ошибку сразу на экран.
	},
	module: { // 
		rules: [ // описание правил. С каким расширением и что делаем.
			{
				test: /\.js$/, // указывается регулярное выражение. 
				//В данном выражение указывается любое название файла с расширением .js
				loader: 'babel-loader' // все файлы "скармливает babel-loader"
				// exclude: '/node_modules/' // Если из node_modules подтягиваем старый формат, то он не будет перегоняться еще раз
			},
			{// Для bootstrap'a и стилей
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					//fallback: "style-loader", // отменяем действие style-loader. Добавляет тег <style> в раздел <head>
					use: "css-loader"
				})
				/*use: [ // установка нескольких loader'ов
					'style-loader',
					'css-loader'
				]*/
			}
		]
	},
	plugins: [ // Подключение плагнов
		new ExtractTextPlugin("styles.css")
	]
	// devtool: 'eval-soursemap' // настройка карты. Для оптимизации используется module.exports ниже

};

// Этот объект мы должно экспортировать

//module.exports = conf;

module.exports = (env, options) => {
	let production = options.mode === 'production'; // Выбор режима работы

	conf.devtool = production ? false : 'eval-soursemap';
	//conf.devtool = production ? 'source-map' : 'eval-soursemap'; // Создаст sourse-map в dist

	return conf;
}