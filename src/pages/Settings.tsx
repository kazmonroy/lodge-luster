import UpdateSettingsForm from '../features/settings/UpdateSettingsForm';
import Row from '../ui/Row';

function Settings() {
  return (
    <>
      <Row direction='horizontal'>
        <h2>Settings</h2>
      </Row>

      <Row>
        <UpdateSettingsForm />
      </Row>
    </>
  );
}

export default Settings;
