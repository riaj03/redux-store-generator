const chalk = require('chalk');
const fs = require('fs');
const config = require("./config.json");
// generators
const actionTypeGenerator = require('./generators/actionTypes-generator')
const actionsGenerator = require("./generators/actions-generator");
const methodsGenerator = require("./generators/methods-generator");
const reducerGenerator = require("./generators/reducer-generator");
const dispatcherGenerator = require("./generators/dispatcher-generator");
const indexGenerator = require("./generators/index-generator");

const getFileNameArguments = () => {
	return process.argv.slice(2);
}

const getOutputFilePath = (input) => {
	const path = config.absolute_project_path && input.directory ? `${config.absolute_project_path}/${input.directory}` : `output_files`
	return path;
}

const execute = () => {
	let files = getFileNameArguments();

	if (files != null && files.length > 0) {
		files.forEach(file => {
			let inputFile = require(`./${file}`);
			// actionTypes.js
			const outputFileDir = `${getOutputFilePath(inputFile)}/${inputFile.model}`;

			if (fs.existsSync(outputFileDir)) {
				console.log(chalk.red(`A folder already exist by the model name ${inputFile.model}`));
			} else {
				fs.mkdirSync(outputFileDir);
				//creating actionTypes.js
				console.log(chalk.blueBright(`creating actionTypes.js for ${inputFile.model}`));
				actionTypeGenerator.createActionType(outputFileDir, inputFile)
				// creating actions.js
				console.log(chalk.blueBright(`creating actions.js for ${inputFile.model}`));
				actionsGenerator.createActions(outputFileDir, inputFile)
				// creating methods.js
				console.log(chalk.blueBright(`creating methods.js for ${inputFile.model}`));
				methodsGenerator.createMethods(outputFileDir, inputFile)
				// creating reducer.js
				console.log(chalk.blueBright(`creating reducer.js for ${inputFile.model}`));
				reducerGenerator.createReducer(outputFileDir, inputFile)
				// creating dispatcher.js
				console.log(chalk.blueBright(`creating dispatchers.js for ${inputFile.model}`));
				dispatcherGenerator.createDispatcher(outputFileDir, inputFile)
				// creating index.js
				console.log(chalk.blueBright(`creating index.js for ${inputFile.model}`));
				indexGenerator.createIndex(outputFileDir, inputFile)
				console.log(chalk.greenBright(`DONE!! All file for redux-store created for model ${inputFile.model}`));
			}
		});
	}

	else console.log(chalk.redBright(`No source files specified. please provide one or more .json source files seperated by empty space.`));
}

execute();
