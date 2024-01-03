import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/fetch';
import style from './login.module.css';

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

  useEffect(() => {
    const getToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const tokenParsed = JSON.parse(token);
        const response = await axios.get('/verify-token', {
          headers: {
            Authorization: `Bearer ${tokenParsed}`,
          },
        });
        if (response.status === 200) {
          navigate('/home');
        }
      }
    };

    getToken();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      const response = await axios.post('/login', {
        username: formData.username,
        password: formData.password,
      });

      const { token } = response.data;

      localStorage.setItem('token', JSON.stringify(token));
      setErrorMessage('');
      setIsLoading(false);
      navigate('/home');
    } catch (err: any) {
      setIsLoading(false);

      // setErrorMessage(err.response);
    }
  };

  if (isLoading) return (<p>Loading...</p>);

  return (
    <form onSubmit={ (e) => handleSubmit(e) }>
      { errorMessage && <p>{ errorMessage }</p>}
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username:
          <input
            type="text"
            value={ formData.username }
            name="username"
            id="username"
            onChange={ (e) => handleChange(e) }
            className="form-control form-control-lg"
          />
        </label>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password:
          <input
            type={ formData.showPassword ? 'text' : 'password' }
            value={ formData.password }
            name="password"
            id="password"
            onChange={ (e) => handleChange(e) }
            className="form-control form-control-lg"
          />
        </label>
      </div>

      <div className="mb-3 form-check">
        <label htmlFor="showPassword" className="form-check-label">
          { formData.showPassword ? 'Hide' : 'Show' }
          {' '}
          password

          <input
            type="checkbox"
            name="showPassword"
            checked={ formData.showPassword }
            id="showPassword"
            onChange={ (e) => handleChange(e) }
            className="form-check-input"
          />
        </label>
      </div>
      <div className={ style.buttons }>
        <button type="submit" className="btn btn-success">Sign in</button>
        <button
          type="button"
          onClick={ () => navigate('/signup') }
          className="btn btn-success"
        >
          Sign up

        </button>
      </div>
    </form>
  );
}

export default Login;
