import Utils from '../utils/utils';
const utils = new Utils();

const LoginService = {
	checkLogin(){
		return utils.getLoginSession();
	},
  
  addUser(email, password){
    utils.addUser(email, password);
  },
  
  getUser(email){
    return utils.getUser(email);
  },
  authenticate(cb) {
    utils.addLoginSession();
    setTimeout(cb, 100); // fake async
  },
  signout() {
    
  	utils.destroyLoginSession();
  }
};

export default LoginService;