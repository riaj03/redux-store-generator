const sinpets = require('../code-snipets');
const fs = require('fs');

const capitalize = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const makeIndexCode = (model) => {
	const indexCode = sinpets.index.replace('@{MODEL_CAP}', capitalize(model))
	return indexCode;
}

const getIndexContent = (input) => {
	const indexCode = makeIndexCode(input.model)
	return indexCode
}

const getIndexFilePath = (path) => {
	const fileName = 'index.js'
	return `${path}/${fileName}`
}
// creating index.js
exports.createIndex = (path, input) => {
	const indexContent = getIndexContent(input);
	const indexFilePath = getIndexFilePath(path)
	fs.writeFile(indexFilePath, indexContent, (err) => {
		if (err) throw err;
	})
}

