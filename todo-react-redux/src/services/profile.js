import Utils from '../utils/utils';
const utils = new Utils();

const ProfileService = {

  save(email, data){
    utils.addUser(email, data);
  },
  
  getUser(email){
    return utils.getUserProfile(email);
  },

};

export default ProfileService;