import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ExitButton() {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <Button
      type="button"
      size="medium"
      color="primary"
      variant="contained"
      onClick={ handleClick }
    >
      Sair

    </Button>

  );
}
