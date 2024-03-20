import { useUser } from './hooks/useUser';
import styles from './styles/UserAvatar.module.css';

function UserAvatar() {
  const { user } = useUser();
  console.log(user?.user_metadata.fullName);
  const avatarUrl = user?.user_metadata.avatar;

  return (
    <div className={styles.avatarWrapper}>
      <img
        src={avatarUrl || 'https://www.svgrepo.com/show/457777/user-alt.svg'}
        alt='User avatar'
        className={styles.avatar}
      />
    </div>
  );
}

export default UserAvatar;
