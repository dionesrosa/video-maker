const prompts = require('prompts');
const state = require("./state.js");

async function robot() {
	const content = {
		maximumSentences: 7
	}

	console.log("Iniciando as perguntas:");

	content.searchTerm = await askAndReturnSearchTerm();
	content.prefix = await askAndReturnPrefix();
	content.lang = await askAndReturnLang();

	console.log("Iniciando busca sobre: "+content.prefix+" "+content.searchTerm);

	state.save(content);

	async function askAndReturnSearchTerm() {
		const questions = {
			type: 'text',
			name: 'searchTerm',
			message: 'O que gostaria de buscar na Wikipedia?',
			validate: value => typeof value === 'string' ? value.trim() !== '' : false
		};

		const response = await prompts(questions);

		return response.searchTerm;
	}

	async function askAndReturnPrefix() {
		const questions = {
			type: 'select',
			name: 'prefix',
			message: 'Selecione uma opção:',
			choices: ['Quem é', 'O que é', 'A história da', 'A história de', 'A história do'],
			validate: value => typeof value === 'string' ? value.trim() !== '' : false
		};

		const response = await prompts(questions);

		return questions.choices[response.prefix];
	}

	async function askAndReturnLang() {
		const questions = {
			type: 'select',
			name: 'lang',
			message: 'Selecione um idioma:',
			choices: ['pt','en', 'es', 'fr'],
			validate: value => typeof value === 'string' ? value.trim() !== '' : false
		};

		const response = await prompts(questions);

		return questions.choices[response.lang];
	}
}

module.exports = robot;