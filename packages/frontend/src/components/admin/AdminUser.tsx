import { useState } from 'react';
import fetch from '../../utils/fetch';
import { DataType } from '../../types/types';
import RegisterUser from '../RegisterUser/RegisterUser';
import EditUser from '../editing/EditUser';
import pencil from '../../assets/pencil.svg';
import close from '../../assets/x.svg';
import editStyle from '../editing/editUser.module.css';
import './adminUser.css';

type AdminUserProps = {
  data: DataType[],
};

export default function AdminUser({ data }: AdminUserProps) {
  const url = 'http://localhost:3001/files';
  const [isEditing, setIsEditing] = useState(
    {
      id: 0,
      isEditing: false,
    },
  );

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('token') || '';
    await fetch.delete(`/delete-user/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });
    window.location.reload();
  };

  const handleClick = (user: DataType) => {
    setIsEditing({
      id: user.id,
      isEditing: true,
    });
  };

  return (
    <main className="main-div">

      <div className="card first-card">
        <button onClick={ () => handleClick(data[0]) } aria-label="edit">
          <img src={ pencil } alt="" />
        </button>
        {data[0].image && <img
          src={ `${url}/${data[0].image}` }
          alt=""
          className="card-img-top"
        />}
        <div className="card-body">
          <h5 className="card-title">{data[0].fullName}</h5>
          <p className="card-text">
            Nome de usuário:
            {' '}
            {data[0].username}
          </p>
          <p className="card-text">
            Email:
            {' '}
            {data[0].email}
          </p>
        </div>
        <div className="card-body">
          <div>
            <span className="card-text">
              Endereço:
              {' '}
              {data[0].address.street}
              ,

            </span>
            {' '}
            <span className="card-text">{data[0].address.number}</span>
          </div>
          <p className="card-text">
            Cidade:
            {' '}
            {data[0].address.city}
          </p>
          <p className="card-text">
            Distrito:
            {' '}
            {data[0].address.district}
          </p>
        </div>
        {(isEditing.isEditing
            && data[0].id === isEditing.id) && (
              <div className={ editStyle.modal }>
                <button
                  onClick={ () => setIsEditing({
                    id: data[0].id,
                    isEditing: false,
                  }) }
                  aria-label="close"
                >
                  <img src={ close } alt="" />
                </button>
                <EditUser data={ data[0] } />
              </div>
        )}
      </div>
      <RegisterUser />
      <div className="cards">

        {data && data.map((user, index) => (

          index > 0 && (
            <div className="other-card" key={ user.id }>
              <div>
                <button onClick={ () => handleClick(user) } aria-label="edit">
                  <img src={ pencil } alt="" />
                </button>
                <button
                  type="button"
                  onClick={ () => handleDelete(user.id) }
                  className="btn-close"
                  aria-label="Close"
                />
              </div>
              {user.image && <img
                src={ `${url}/${user.image}` }
                alt=""
                className="card-img-top"
              />}
              <div className="card-body">
                <h5 className="card-title">{user.fullName}</h5>
                <p className="card-text">
                  Nome de usuário:
                  {' '}
                  {user.username}
                </p>
                <p className="card-text">
                  Email:
                  {' '}
                  {user.email}
                </p>
              </div>
              <div className="card-body">
                <div>
                  <span className="card-text">
                    Endereço:
                    {' '}
                    {user.address.street}
                    ,

                  </span>
                  {' '}
                  <span className="card-text">{user.address.number}</span>
                </div>
                <p className="card-text">
                  Cidade:
                  {' '}
                  {user.address.city}
                </p>
                <p className="card-text">
                  Distrito:
                  {' '}
                  {user.address.district}
                </p>
              </div>
              {(isEditing.isEditing
            && user.id === isEditing.id) && (
              <div className={ editStyle.modal }>
                <button
                  onClick={ () => setIsEditing({
                    id: user.id,
                    isEditing: false,
                  }) }
                  aria-label="close"
                >
                  <img src={ close } alt="" />
                </button>
                <EditUser data={ user } />
              </div>
              )}
            </div>)
        ))}
      </div>
    </main>
  );
}
