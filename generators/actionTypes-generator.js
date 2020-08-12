const sinpets = require('../code-snipets');
const fs = require('fs');
const methodAndModelName = require("./method-name");

const makeActionTypesCodes = (input) => {
	const actionTypesGroupSnipets = sinpets.actionTypes.actionTypeGroup;
	let actionTypesGroup = "";
	for (let index = 0; index < input.methods.length; index++) {
		const { methodName, modelName } = methodAndModelName.generateMathodName(input.methods[index], input.model, input.pleuralModel)

		actionTypesGroup += actionTypesGroupSnipets.replace(/@{ACTION_TYPE}/g, `${methodName.toUpperCase()}_${modelName.toUpperCase()}`)
	}
	return actionTypesGroup
}

// creating actionTypes.js
const getActionTypesContent = (input) => {
	const actionTypesCodes = makeActionTypesCodes(input)
	const actionTypes = actionTypesCodes

	return actionTypes
}

const getActionTypeFilePath = (path) => {
	const fileName = 'actionTypes.js'
	return `${path}/${fileName}`
}
// creating actionTypes.js
exports.createActionType = (path, input) => {
	const actionTypeContent = getActionTypesContent(input);
	const actionTypeFilePath = getActionTypeFilePath(path)
	fs.writeFile(actionTypeFilePath, actionTypeContent, (err) => {
		if (err) throw err;
	})
}
