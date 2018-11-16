import Utils from '../utils/utils';
const utils = new Utils();

const LoginService = {
	checkLogin(){
		return utils.getLoginSession();
	},
  authenticate(cb) {
    utils.addLoginSession();
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
  	utils.destroyLoginSession();
    setTimeout(cb, 100);
  }
};

export default LoginService;