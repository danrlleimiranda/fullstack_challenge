import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from '../../utils/fetch';
import useForms from '../../hooks/useForms';
import { estadosBrasileiros } from '../../utils/data';
import style from './registerUser.module.css';

export default function RegisterUser() {
  const [newUser, setNewUser] = useState(false);
  const [file, setFile] = useState<File | undefined>();
  const [isActive, setIsActive] = useState(true);
  const initalState = { fullName: '',
    username: '',
    email: '',
    password: '',
    admin: 'false',
    passwordConfirmation: '',
    city: '',
    street: '',
    number: '',
    district: '' };
  const { handleChange, form, setForm } = useForms(initalState);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const image = new FormData();

    image.append('file', file as File);

    try {
      const token = localStorage.getItem('token');
      if (token) {
        const tokenParsed = JSON.parse(token);

        const response = await axios.post('/upload', image, {
          headers: {
            Authorization: `Bearer ${tokenParsed}`,
          } });

        await axios.post('/register', { ...form, image: response.data }, {
          headers: {
            Authorization: `Bearer ${tokenParsed}`,
          },
        });

        setForm(initalState);
        setIsActive(!isActive);
      }
      window.location.reload();
    } catch (err: any) {
      console.log(err.response.data.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err.response.data.message}`,
      });
      setForm(initalState);
    }
  };

  const isValid = () => {
    return !(form.fullName && form.username && form.email && form.password && form.admin
          && file && form.passwordConfirmation
          && form.password === form.passwordConfirmation && form.district);
  };

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      setFile(files[0]);
    }
  };

  return (
    <div className={ style.btn }>
      {isActive && (
        <button
          type="button"
          onClick={ () => {
            setNewUser(!newUser);
            setIsActive(!isActive);
          } }
          className="btn btn-success"
        >
          Cadastrar novo usuário

        </button>)}
      {newUser && (
        <form action="" onSubmit={ (e) => handleSubmit(e) } className={ style.container }>
          <button
            type="button"
            onClick={ () => {
              setNewUser(false);
              setIsActive(true);
            } }
            className="btn-close"
            aria-label="Close"
          />
          <label htmlFor="fullName" className="form-label">
            Nome:
            <input
              type="text"
              name="fullName"
              id="fullName"
              onChange={ (e) => handleChange(e) }
              value={ form.fullName }
              className="form-control"
            />
          </label>

          <label htmlFor="" className="form-label">
            Nome de Usuário:
            <input
              type="text"
              name="username"
              onChange={ (e) => handleChange(e) }
              id="username"
              value={ form.username }
              className="form-control"
            />
          </label>

          <label htmlFor="email" className="form-label">
            Email:
            <input
              type="text"
              name="email"
              id="email"
              onChange={ (e) => handleChange(e) }
              value={ form.email }
              className="form-control"
            />
          </label>
          <label htmlFor="district" className="form-label">
            Selecione um estado:
            <select
              id="district"
              name="district"
              defaultValue={ form.district }
              onChange={ (e) => handleChange(e) }
              className="form-select form-select-sm"
            >
              <option value="" disabled>Selecione um estado</option>
              {estadosBrasileiros.map((estado) => (
                <option key={ estado } value={ estado }>{ estado }</option>
              ))}
            </select>
          </label>

          <label htmlFor="">
            Cidade:
            <input
              type="text"
              name="city"
              id="city"
              onChange={ (e) => handleChange(e) }
            />
          </label>
          <div>
            <label htmlFor="">
              Rua:
              <input
                type="text"
                name="street"
                id="street"
                onChange={ (e) => handleChange(e) }
              />
            </label>
            <label htmlFor="">
              Número:
              <input
                type="text"
                name="number"
                id="number"
                onChange={ (e) => handleChange(e) }
              />
            </label>
          </div>
          <div>
            <label htmlFor="password" className="form-label">
              Senha:
              <input
                type="password"
                name="password"
                onChange={ (e) => handleChange(e) }
                id="password"
                value={ form.password }
                className="form-control"
              />
            </label>
            <label htmlFor="passwordConfirmation" className="form-label">
              Confirme a senha:
              <input
                type="password"
                name="passwordConfirmation"
                id="passwordConfirmation"
                onChange={ (e) => handleChange(e) }
                value={ form.passwordConfirmation }
                className="form-control"
              />
              {form.password !== form.passwordConfirmation
              && <p>As senhas não correspondem!</p>}
            </label>
          </div>

          <label htmlFor="admin" className="form-label">
            Administrador:
            <select
              name="admin"
              id="admin"
              defaultValue={ form.admin }
              onChange={ (e) => handleChange(e) }
              className="form-select form-select-sm"
            >
              <option value="true">Administrador</option>
              <option value="false">Cliente</option>
            </select>
          </label>

          <label htmlFor="image" className="form-label">
            Imagem:
            <input
              type="file"
              name="image"
              id="image"
              onChange={ (e) => handleFile(e) }
              className="form-control"
            />
          </label>
          <button type="submit" disabled={ isValid() } className="btn btn-success">
            Cadastrar
          </button>
        </form>)}
    </div>
  );
}
