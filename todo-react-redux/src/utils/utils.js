

class Utils{
	store = (namespace, data) => {
		if (data) {
			return localStorage.setItem(namespace, JSON.stringify(data));
		}

		const store = localStorage.getItem(namespace);
		return (store && JSON.parse(store)) || [];
	};
	getLoginSession = () => 
	{
		return sessionStorage.getItem('namespace');
	};

	addLoginSession = () => {
		sessionStorage.setItem('namespace', 'namespace');
	};

	destroyLoginSession = () =>{
		sessionStorage.removeItem('namespace');
	};
	
	
	addUser = (email, password) => {
		localStorage.setItem(email, password);
	}

	getUser = (email) => {
		return localStorage.getItem(email);
	}

};

export default Utils;