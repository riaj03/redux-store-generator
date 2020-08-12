const sinpets = require('../code-snipets');
const fs = require('fs');
const methodAndModelName = require("./method-name");

const makeMethodsCode = (methods, model, modelPl) => {
	let importSectionStart = sinpets.methods.startSnipet
	let method = ''
	for (let index = 0; index < methods.length; index++) {
		const { methodName, modelName } = methodAndModelName.generateMathodName(methods[index], model, modelPl)
		importSectionStart = importSectionStart.replace('@{MODEL}', modelName);

		importSectionStart = importSectionStart.replace('@{METHOD}', methodName)

		method = sinpets.methods.contents.replace(/@{MODEL}/g, modelName);

		method = method.replace(/@{METHOD_UPPER}/g, methodName.toUpperCase());

		method = method.replace(/@{MODEL_UPPER}/g, modelName.toUpperCase())

		method = index < methods.length - 1 ? `${method},` : `${method} \n`

		importSectionStart += method
	}
	importSectionStart += sinpets.methods.endSnipet
	return importSectionStart
}


// creating actionTypes.js
const methodsContent = (input) => {
	const code = makeMethodsCode(input.methods, input.model, input.pleuralModel)
	return code
}

const getMethodsFilePath = (path) => {
	const fileName = 'methods.js'
	return `${path}/${fileName}`
}
// creating actionTypes.js
exports.createMethods = (path, input) => {
	const methodContent = methodsContent(input);
	const methodFilePath = getMethodsFilePath(path)
	fs.writeFile(methodFilePath, methodContent, (err) => {
		if (err) throw err;
	})
}
