import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import axios from '../../utils/fetch';
import style from './login.module.css';
import aeternusLogo from '../../assets/aeternus-high-resolution-logo-transparent.svg';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    showPassword: false,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement
  | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
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
      if (err.response) {
        setIsLoading(false);

        setErrorMessage(err.response.data.message);
      }
    }
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  if (isLoading) return (<p>Loading...</p>);

  return (
    <div className={ style.login }>
      <Box
        sx={ { display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem',
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'center' } }
      >
        <img src={ aeternusLogo } alt="" className={ style.logo } />
        <form onSubmit={ (e) => handleSubmit(e) } className={ style.form }>
          <TextField
            id="username"
            error={ errorMessage !== '' }
            name="username"
            label="Username"
            helperText={ errorMessage }
            onChange={ (e) => handleChange(e) }
            InputProps={ {
              endAdornment: (
                <InputAdornment position="start">
                  <AccountCircle color="primary" />
                </InputAdornment>
              ),
            } }
            variant="standard"
          />

          <TextField
            id="password"
            name="password"
            error={ errorMessage !== '' }
            onChange={ (e) => handleChange(e) }
            fullWidth
            label="Password"
            value={ formData.password }
            type={ showPassword ? 'text' : 'password' }
            InputProps={ {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    color="primary"
                    onClick={ handleClickShowPassword }
                    onMouseDown={ handleMouseDownPassword }
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            } }
            variant="standard"
          />
          <div className={ style.buttons }>
            <Button
              type="submit"
              size="medium"
              color="primary"
              variant="contained"
            >
              Sign in

            </Button>
          </div>
        </form>
      </Box>
    </div>
  );
}

export default Login;
