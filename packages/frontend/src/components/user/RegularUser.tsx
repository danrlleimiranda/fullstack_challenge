import { DataType } from '../../types/types';
import EditUser from '../editing/EditUser';

type RegularUserProps = {
  data: DataType,
};

function RegularUser({ data }: RegularUserProps) {
  const url = 'http://localhost:3001/files';

  return (
    <div>
      {
      data
      && (
        <div>
          <img src={ `${url}/${data.image}` } alt="" />
          <p>{data.fullName}</p>
          <p>{data.username}</p>
          <p>{data.email}</p>
          {data.address
          && (
            <div>
              <p>{data.address.street}</p>
              <p>{data.address.number}</p>
              <p>{data.address.city}</p>
            </div>)}
        </div>)
}
      <button>Editar informações</button>
      <EditUser data={ data } />
    </div>

  );
}

export default RegularUser;
