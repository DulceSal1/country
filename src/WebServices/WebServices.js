import axios from 'axios';
import WebService from './WebService';

const url = 'https://anapioficeandfire.com/api/characters';
const urlFakeApi = 'https://reqres.in/api/';
const urlWeatherApi = 'http://api.openweathermap.org/data/2.5/weather?';
const keyWeatherApi = 'appid=d0b76fd83718eef1932b224506cfb48f';
const urlCountries = 'https://restcountries.eu/rest/v2/name/';

export default {
	async createFakeApi({ name, job }) {
		return await WebService.post(urlFakeApi + 'users', {
			name,
			job
		});
	},
	async getCharacter({ character }) {
		return await WebService.get(url + '/' + character);
	},
	async getListUsers() {
		return await WebService.get(urlFakeApi + 'users?page=2');
	},

	async getWeatherByCityId({ cityId }) {
		console.log('TCL: getWeatherByCityId -> cityId', cityId);
		return await WebService.get(urlWeatherApi + 'id=' + cityId + '&' + keyWeatherApi);
	},
	async getCountryDetails({ country }) {
		return await WebService.get(urlCountries + country + '?fullText=true');
	},
	async getCountryURL({ newURL }) {
		return await WebService.get(newURL + '?fullText=true');
	}

};
