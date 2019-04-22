const robots = {
  input: require("./robots/input.js"),
	text: require("./robots/text.js"),
  state: require("./robots/state.js"),
  image: require("./robots/image.js")
}

async function start() {
  //robots.input();
  //await robots.text();
  await robots.image();

  const content = robots.state.load();
  console.dir(content, { depth: null });
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