const sinpets = require('../code-snipets');
const fs = require('fs');
const methodAndModelName = require("./method-name");

const makeDispatcherImportCode = (methods, model, modelPl) => {
	let staticImports = sinpets.dispatcher.imports.static;
	staticImports = staticImports.replace(/@{MODEL}/g, model)
	const startImportContent = sinpets.dispatcher.imports.methodStart;
	const endImportContent = sinpets.dispatcher.imports.methodEnd;
	let importContentSection = sinpets.dispatcher.imports.methodContents
	let contentMethods = startImportContent
	let importCodes = ''

	for (let index = 0; index < methods.length; index++) {
		const { methodName, modelName } = methodAndModelName.generateMathodName(methods[index], model, modelPl)
		method = importContentSection.replace('@{METHOD}', methodName);

		method = method.replace('@{MODEL}', modelName)

		method = index < methods.length - 1 ? `${method},` : `${method}`

		contentMethods += method
	}

	contentMethods += endImportContent

	importCodes += `${staticImports} ${contentMethods}`
	return importCodes
}

const makeDispatcherBodyCode = (methods, model, modelPl) => {
	const contentStart = sinpets.dispatcher.contents.start;
	const contentEnd = sinpets.dispatcher.contents.end;
	let contentBodyCode = ''
	let bodyMethods = '';

	for (let index = 0; index < methods.length; index++) {
		const { methodName, modelName } = methodAndModelName.generateMathodName(methods[index], model, modelPl)

		let method = sinpets.dispatcher.contents.body;
		method = method.replace(/@{MODEL}/g, modelName);
		method = method.replace(/@{MODEL_UPPER}/g, modelName.toUpperCase())
		method = method.replace(/@{METHOD_UPER}/g, methodName.toUpperCase())

		method = method.replace(/@{METHOD}/g, methodName)

		bodyMethods += method;
	}

	contentBodyCode += `${contentStart} ${bodyMethods} ${contentEnd}`
	return contentBodyCode

}

// creating Dispatcher.js
const getDispatcherContent = (input) => {
	const importsCode = makeDispatcherImportCode(input.methods, input.model, input.pleuralModel)
	const contentsCode = makeDispatcherBodyCode(input.methods, input.model, input.pleuralModel)
	return `${importsCode} ${contentsCode}`
}

const getDispatcherFilePath = (path) => {
	const fileName = 'dispatchers.js'
	return `${path}/${fileName}`
}
// creating dispatcher.js
exports.createDispatcher = (path, input) => {
	const dispatcherContent = getDispatcherContent(input);
	const dispatcherFilePath = getDispatcherFilePath(path)
	fs.writeFile(dispatcherFilePath, dispatcherContent, (err) => {
		if (err) throw err;
	})
}
