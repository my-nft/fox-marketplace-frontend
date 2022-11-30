import { useSelector } from 'react-redux';
import { selectConnectedUser } from '../../redux/userReducer';
import ProfileForm from './ProfileForm';


const ProfileWrapper = () => {
  const connectedUser = useSelector(selectConnectedUser);
  return <ProfileForm connectedUser={connectedUser}/>;
};

export default ProfileWrapper;
