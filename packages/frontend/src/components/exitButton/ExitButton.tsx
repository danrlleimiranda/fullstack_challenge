import { useNavigate } from 'react-router-dom';

export default function ExitButton() {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <button onClick={ handleClick } className="btn btn-primary">Sair</button>
  );
}
