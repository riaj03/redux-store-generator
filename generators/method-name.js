exports.generateMathodName = (inputMethod, inputModel, inputModelPl) => {
	return {
		methodName: inputMethod === 'gets' ? 'get' : inputMethod,
		modelName: inputMethod === 'gets' ? inputModelPl : inputModel,
	}
}
