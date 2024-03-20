import SignUpForm from '../features/auth/SignUpForm';
import Row from '../ui/Row';

function Users() {
  return (
    <>
      <Row direction='horizontal'>
        <h2>Users</h2>
      </Row>
      <Row>
        <SignUpForm />
      </Row>
    </>
  );
}

export default Users;
