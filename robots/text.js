const algorithmia = require("algorithmia");
const algorithmiaApiKey = require("../credentials/algorithmia.json").apiKey;
const sentenceBoundaryDetection = require('sbd');

async function robot(content) {
	await fetchContentFromWikipedia(content);
	sanitizeContent(content);
	breakContentIntoSetenses(content);

	async function fetchContentFromWikipedia(content) {
		const algorithmiaAutenticated = algorithmia(algorithmiaApiKey);
		const wikipediaAlgoritimia = algorithmiaAutenticated.algo('web/WikipediaParser/0.1.2');
		wikipediaResponse = await wikipediaAlgoritimia.pipe(content.searchTerm);
		const wikipediaContent = wikipediaResponse.get();
		

		content.sourceContentOriginal = wikipediaContent.content;
	}

	function sanitizeContent(content) {
		const withoutBlankLinesAndMarkdown  = removeBlankLinesAndMarkdown(content.sourceContentOriginal);
		const withoutDatesInParentheses = removeDatesInParentheses(withoutBlankLinesAndMarkdown);

		content.sourceContentSanitized  = withoutDatesInParentheses;

		function removeBlankLinesAndMarkdown(text) {
			const allLines = text.split('\n');
			
			const withoutBlankLinesAndMarkdown = allLines.filter((line) => {
				if(line.trim().length === 0 || line.trim().startsWith('=')) {
					return false;
				}

				return true;
			});

			return withoutBlankLinesAndMarkdown.join(' ');
		}

		function removeDatesInParentheses(text) {
			return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
		}
	}

	function breakContentIntoSetenses(content) {
		const sentenses = [];

		const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized);
		sentences.forEach((sentence) => {
			content.sentences.push({
				text: sentence,
				keywords: [],
				images: []
			});
		});
	}
}

module.exports = robot;