import { useUser } from './hooks/useUser';
import styles from './styles/UserAvatar.module.css';

function UserAvatar() {
  const { user } = useUser();

  const { avatar } = user!.user_metadata!;

  return (
    <div className={styles.avatarWrapper}>
      <img
        src={avatar || 'https://www.svgrepo.com/show/457777/user-alt.svg'}
        alt='User avatar'
        className={styles.avatar}
      />
    </div>
  );
}

export default UserAvatar;
