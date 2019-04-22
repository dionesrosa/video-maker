const readline = require("readline-sync");
const robots = {
	text: require("./robots/text.js")
}

async function start() {
	const content = {
    maximumSentences: 7
  }

	content.searchTerm = askAndReturnSearchTerm();
	content.prefix = askAndReturnPrefix();

	await robots.text(content);

	function askAndReturnSearchTerm() {
		//return readline.question('Type a Wikipedia search term:');
    return "Justin Bieber";
	}

	function askAndReturnPrefix() {
		const prefixes = ['Who is', 'What is', 'The history of'];
		/*const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Choose one option:');
		const selectedPrefixText = prefixes[selectedPrefixIndex];*/

		//return selectedPrefixText;
    return prefixes[0];
	}

	console.log(JSON.stringify(content, null, 4));
}

start();


/*    ATUALIZAÇÃO
const prompts = require('prompts')
const robots = {
  //text: require('./robots/text.js')
}

function askAndReturnAnswers() {
  const questions = [
    {
        type: 'text',
        name: 'searchTerm',
        message: 'Type a Wikipedia search term:',
        validate: value => typeof value === 'string' ? value.trim() !== '' : false,
    },
    {
        type: 'select',
        name: 'prefix',
        message: 'Choose one option:',
        choices: ['Who is', 'What is', 'The history of'],
        validate: value => typeof value === 'string' ? value.trim() !== '' : false,
    }
  ]

  return new Promise(async (resolve, reject) => {
    const promptOptions = { 
      onCancel: () => reject(new Error('The user has stopped answer'))
    }
    const response = await prompts(questions, promptOptions)
    resolve(response)
  })
}

async function start() {
  const content = await askAndReturnAnswers()

  //await robots.text(content)

  console.log(content)
}

start()*/