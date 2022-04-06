import { useLocation, useNavigate, useParams } from 'react-router-dom';

import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useEffect, useState } from 'react';
import { addFriend, fetchUserProfile, removeFriend } from '../api';
import { useToasts } from 'react-toast-notifications';
import { Loader } from '../components';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [reqesstInProgress, setreqesstInProgress] = useState(false);
  const { userId } = useParams();
  const { addToast } = useToasts();
  const history = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);

      if (response.success) {
        setUser(response.data.user);
        console.log('its working and the user is', response.data.user);
      } else {
        addToast(response.message, {
          appearance: 'error',
        });
        //return history.push('/');
        //user only url with  history in v6
        return history('/');
      }
      setLoading(false);
    };
    getUser();
  }, [userId, history, addToast]);

  //location is needed when we were using the state sent from the home page
  //const location = useLocation();
  //console.log(location);
  //const { user = {} } = location.state;

  if (loading) {
    return <Loader />;
  }

  const checkIfUserIsAFriend = () => {
    //console.log('check here', auth.user);
    // let friends;
    // if (!auth.user.friends) {
    //   friends = [];
    // } else {
    //   friends = auth.user.friends;
    // }

    const friends = auth.user.friends;

    const friendIds = friends.map((friend) => friend.to_user._id);
    const index = friendIds.indexOf(userId);

    if (index !== -1) {
      return true;
    }

    return false;
  };

  const handleRemoveFriendClick = async () => {
    setreqesstInProgress(true);
    const response = await removeFriend(userId);

    if (response.success) {
      const friendship = auth.user.friends.filter(
        (friend) => friend.to_user._id == userId
      );
      auth.updateUserFriends(false, friendship[0]);

      addToast('Friend removed successfully', {
        appearance: 'success',
      });
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }

    setreqesstInProgress(false);
  };

  const handleAddFriendClick = async () => {
    setreqesstInProgress(true);
    const response = await addFriend(userId);

    if (response.success) {
      const { friendship } = response.data;
      auth.updateUserFriends(true, friendship);

      addToast('Friend added successfully', {
        appearance: 'success',
      });
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }

    setreqesstInProgress(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleRemoveFriendClick}
            disabled={reqesstInProgress}
          >
            {reqesstInProgress ? 'Removing Friend' : 'Remove friend'}
          </button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleAddFriendClick}
            disabled={reqesstInProgress}
          >
            {reqesstInProgress ? 'Adding Friend' : 'Add friend'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
