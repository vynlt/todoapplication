

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
		sessionStorage.clear();
	};

};

export default Utils;