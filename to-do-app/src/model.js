
class Model{

	constructor(modelName){
		this.modelName = modelName;
		this.todos = this.storeData(modelName);
		this.onChanges = [];
	}

	storeData(modelName, data){
		if (data) {
			return localStorage.setItem(modelName, JSON.stringify(data));
		}

		const model = localStorage.getItem(modelName);
		return (model && JSON.parse(model)) || [];
	}

	generateRandomId(){
			var i, random;
			var uuid = '';

			for (i = 0; i < 32; i++) {
				random = Math.random() * 16 | 0;
				if (i === 8 || i === 12 || i === 16 || i === 20) {
					uuid += '-';
				}
				uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
					.toString(16);
			}

			return uuid;
	}

	insert(){
		this.todos = this.todos.concat({
			id: this.generateRandomId(),
			title: this.title,
			completed: false
		});

		this.storeData(this.modelName, this.data);
	}

}

export default Model;