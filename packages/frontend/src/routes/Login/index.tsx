import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetch from '../../utils/fetch';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    showPassword: false,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;

    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: name === 'showPassword' ? checked : value,
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      const response = await fetch.post('/login', {
        username: formData.username,
        password: formData.password,
      });

      const { token } = response.data;

      localStorage.setItem('token', JSON.stringify(token));
      setErrorMessage('');
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.response.data.message);
    }
  };

  if (isLoading) return (<p>Loading...</p>);

  return (
    <form onSubmit={ (e) => handleSubmit(e) }>
      { errorMessage && <p>{ errorMessage }</p>}
      <label htmlFor="username">
        Username:
        <input
          type="text"
          value={ formData.username }
          name="username"
          id="username"
          onChange={ (e) => handleChange(e) }
        />
      </label>
      <label htmlFor="password">
        Password:
        <input
          type={ formData.showPassword ? 'text' : 'password' }
          value={ formData.password }
          name="password"
          id="password"
          onChange={ (e) => handleChange(e) }
        />
      </label>
      <label htmlFor="showPassword">
        { formData.showPassword ? 'Hide' : 'Show' }
        {' '}
        password

        <input
          type="checkbox"
          name="showPassword"
          checked={ formData.showPassword }
          id="showPassword"
          onChange={ (e) => handleChange(e) }
        />
      </label>
      <button>Sign in</button>
      <button type="button" onClick={ () => navigate('/signup') }>Sign up</button>
    </form>
  );
}

export default Login;
