import { useAlert } from 'react-alert';

const success = () => {
  const alert = useAlert();

  alert.success('Check Your Mail for the Reset Link');
};

export default success;
