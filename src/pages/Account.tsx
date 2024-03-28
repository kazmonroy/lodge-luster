import UpdatePasswordForm from '../features/auth/UpdatePasswordForm';
import UpdateUserForm from '../features/auth/UpdateUserForm';
import Row from '../ui/Row';

function Account() {
  return (
    <>
      <Row direction='horizontal'>
        <h2>Account</h2>
      </Row>

      <Row>
        <UpdateUserForm />
      </Row>

      <Row>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
