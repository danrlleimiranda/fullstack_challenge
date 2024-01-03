import React from 'react';
import useForms from '../../hooks/useForms';
import axios from '../../utils/fetch';
import { estadosBrasileiros } from '../../utils/data';
import { DataType } from '../../types/types';

type EditUserProps = {
  data: DataType
};
export default function EditUser({ data }: EditUserProps) {
  const initalState = {
    fullName: data.fullName,
    username: data.username,
    email: data.email,
    password: '',
    district: data.address ? data.address.district : '',
    city: data.address ? data.address.city : '',
    street: data.address ? data.address.street : '',
    number: data.address ? data.address.number : '',
  };
  const { handleChange, form } = useForms(initalState);

  const isValid = () => {
    return !(form.fullName && form.username
      && form.email && form.password && form.district);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('fullName', form.fullName);
    formData.append('username', form.username);
    formData.append('email', form.email);
    formData.append('password', form.password);
    formData.append('district', form.district);
    formData.append('city', form.city);
    formData.append('street', form.street);
    formData.append('number', form.number);

    try {
      const token = localStorage.getItem('token');
      if (token) {
        const tokenParsed = JSON.parse(token);

        await axios.put(`/update/${data.id}`, formData, {
          headers: {
            Authorization: `Bearer ${tokenParsed}`,
          } });
      }
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form action="" onSubmit={ (e) => handleSubmit(e) }>

        <label htmlFor="fullName">
          Nome completo:
          <input
            type="text"
            name="fullName"
            id={ form.fullName }
            className="form-control"
            value={ form.fullName }
            onChange={ (e) => handleChange(e) }
          />
        </label>

        <label htmlFor="username">
          Nome de usuário:
          <input
            type="text"
            name="username"
            id={ form.username }
            className="form-control"
            value={ form.username }
            onChange={ (e) => handleChange(e) }
          />
        </label>

        <label htmlFor="district" className="form-label">
          Selecione um estado:
          <select
            id={ form.district }
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

        <label htmlFor="city">
          Cidade:
          <input
            type="text"
            name="city"
            id={ form.city }
            value={ form.city }
            onChange={ (e) => handleChange(e) }
          />
        </label>

        <label htmlFor="street">
          Endereço:
          <input
            type="text"
            name="street"
            id={ form.street }
            value={ form.street }
            onChange={ (e) => handleChange(e) }
          />
        </label>

        <label htmlFor="number">
          Número:
          <input
            type="text"
            name="number"
            id={ form.number }
            value={ form.number }
            onChange={ (e) => handleChange(e) }
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            id={ form.email }
            onChange={ (e) => handleChange(e) }
            disabled
            value={ form.email }
          />
        </label>
        <div>
          <label htmlFor="password" className="form-label">
            Senha:
            <input
              type="password"
              name="password"
              onChange={ (e) => handleChange(e) }
              id={ form.password }
              value={ form.password }
              className="form-control"
            />
          </label>
        </div>

        <button disabled={ isValid() }>Confirmar alterações</button>
      </form>
    </div>
  );
}
