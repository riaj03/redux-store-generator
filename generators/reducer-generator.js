const sinpets = require('../code-snipets');
const fs = require('fs');
const methodAndModelName = require("./method-name");

const makeReducerImportCode = (methods, model, modelPl) => {
	let importSectionStart = sinpets.reducer.imports.startSnipet;
	let importContentSection = sinpets.reducer.imports.contents
	let method = ''
	for (let index = 0; index < methods.length; index++) {
		const { methodName, modelName } = methodAndModelName.generateMathodName(methods[index], model, modelPl)
		method = importContentSection.replace('@{METHOD_PL}', methodName.toUpperCase());

		method = method.replace('@{MODEL_PL}', modelName.toUpperCase())

		method = index < methods.length - 1 ? `${method},` : `${method}`

		importSectionStart += method
	}
	importSectionStart += sinpets.reducer.imports.endSnipet
	return importSectionStart
}

const makeReducerInitialStateCode = (methods, model, modelPl) => {
	let initialStateSectionStart = sinpets.reducer.initialState.startSnipet
	let initialStateSectionEnd = sinpets.reducer.initialState.endSnipet
	let initialStateMethod = sinpets.reducer.initialState.method
	let methodCode = '';
	let initialStateCode = ''
	for (let index = 0; index < methods.length; index++) {
		// const { methodName, modelName } = methodAndModelName.generateMathodName(methods[index], model, modelPl)

		method = initialStateMethod.replace('@{METHOD}', methods[index]);

		method = index < methods.length - 1 ? `${method},` : `${method}, `

		methodCode += method
	}
	initialStateCode += `${initialStateSectionStart}  ${methodCode}  ${initialStateSectionEnd}`
	return initialStateCode
}

const makeReducerModelReducerCode = (methods, model, modelPl) => {
	let startSnipet = sinpets.reducer.modelReducer.startSnipet;
	startSnipet = startSnipet.replace('@{MODEL}', model);

	const endSnipet = sinpets.reducer.modelReducer.endSnipet;
	const contentSnipet = sinpets.reducer.modelReducer.contents;
	const endContentSnipet = sinpets.reducer.modelReducer.endContents;
	let methodCases = '';
	let modelReducerCode = ''
	for (let index = 0; index < methods.length; index++) {
		const { methodName, modelName } = methodAndModelName.generateMathodName(methods[index], model, modelPl)

		let methodCase = contentSnipet.replace(/@{METHOD_PL}/g, methodName.toUpperCase());

		methodCase = methodCase.replace(/@{MODEL_PL}/g, modelName.toUpperCase())

		methodCase = methodCase.replace('@{METHOD}', methodName)
		methodCases += methodCase
	}
	methodCases += endContentSnipet
	modelReducerCode = `${startSnipet} ${methodCases} ${endSnipet}`
	return modelReducerCode
}


// creating reducer.js
const getReducerContent = (input) => {
	const importsCode = makeReducerImportCode(input.methods, input.model, input.pleuralModel)
	const initialStateCode = makeReducerInitialStateCode(input.methods, input.model, input.pleuralModel);
	const modelReducerCode = makeReducerModelReducerCode(input.methods, input.model, input.pleuralModel)
	return `${importsCode} ${initialStateCode} ${modelReducerCode}`
}

const getReducerFilePath = (path) => {
	const fileName = 'reducer.js'
	return `${path}/${fileName}`
}
// creating ReducerTypes.js
exports.createReducer = (path, input) => {
	const ReducerContent = getReducerContent(input);
	const ReducerFilePath = getReducerFilePath(path)
	fs.writeFile(ReducerFilePath, ReducerContent, (err) => {
		if (err) throw err;
	})
}
