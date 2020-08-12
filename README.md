
# redux-store file generator

## Install dependencies
```
npm install
```
### Update `config.json`

```
{
	// Ends with '/'
	"absolute_project_path": "absolute_project_root_directory"
}

```
### Create `<Model>.json` files in `/input_files`

```
{
	"model": "Your model name", // e.g: Client
	"pleuralModel": "Pleural name of model", // e.g: Clients
	"methods": [ 
		"gets",
		"get",
		"put",
		"post",
		"delete"
	], // add or remove from method list as your necesity
	"directory": "output_directory_relative_to_project_root_directory",	// Ends with '/'
}
```

### Run this command from your terminal
```
node index.js input_files/model01.json input_files/model02.json
```
