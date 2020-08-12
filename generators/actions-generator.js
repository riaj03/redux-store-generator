const sinpets = require('../code-snipets');
const fs = require('fs');
const methodAndModelName = require("./method-name");

const makeActionImportCode = (methods, model, modelPl) => {
	let importSectionStart = 'import {'
	for (let index = 0; index < methods.length; index++) {
		const { methodName, modelName } = methodAndModelName.generateMathodName(methods[index], model, modelPl)

		importSectionStart += (index < methods.length - 1) ? `${methodName.toUpperCase()}_${modelName.toUpperCase()},` : `${methodName.toUpperCase()}_${modelName.toUpperCase()}`;
	}
	importSectionStart += `} from './actionTypes';`
	return importSectionStart
}


const makeActionMethodCode = (inputMethods, model, modelPl) => {
	let actionMethods = '';
	for (let index = 0; index < inputMethods.length; index++) {
		const { methodName, modelName } = methodAndModelName.generateMathodName(inputMethods[index], model, modelPl)

		let method = sinpets.actions.method;

		method = method.replace(/@{INPUT_METHOD}/, methodName)

		method = method.replace(/@{MODEL}/g, modelName);

		method = method.replace(/@{MODEL_UPPER}/g, modelName.toUpperCase())

		method = method.replace(/@{METHOD}/g, methodName)

		method = method.replace(/@{METHOD_UPPER}/g, methodName.toUpperCase())
		actionMethods += `${method} \n`

	}
	return actionMethods
}

// creating actionTypes.js
const getActionsContent = (input) => {
	const importsCode = makeActionImportCode(input.methods, input.model, input.pleuralModel)
	const methodCode = makeActionMethodCode(input.methods, input.model, input.pleuralModel)
	return `${importsCode} \n ${methodCode}`
}

const getActionsFilePath = (path) => {
	const fileName = 'actions.js'
	return `${path}/${fileName}`
}
// creating actionTypes.js
exports.createActions = (path, input) => {
	const actionContent = getActionsContent(input);
	const actionFilePath = getActionsFilePath(path)
	fs.writeFile(actionFilePath, actionContent, (err) => {
		if (err) throw err;
	})
}
