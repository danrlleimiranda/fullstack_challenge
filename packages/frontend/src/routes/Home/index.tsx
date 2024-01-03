import { useEffect, useState } from 'react';
import AdminUser from '../../components/admin/AdminUser';
import RegularUser from '../../components/user/RegularUser';
import fetch from '../../utils/fetch';
import { DataType } from '../../types/types';
import Header from '../../components/header/Header';
import style from './home.module.css';

export default function Home() {
  const [admin, setAdmin] = useState<DataType[]>([]);
  const [regular, setRegular] = useState<DataType>({} as DataType);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const tokenParsed = JSON.parse(token);
        const response = await fetch.get('/me', {
          headers: {
            Authorization: `Bearer ${tokenParsed}`,
          },
        });
        const { data } = response;

        if (Array.isArray(data)) {
          setAdmin(data);
          setIsAdmin(true);
        } else {
          setRegular(data);
        }
      }
    };

    getUsers();
  }, []);

  return (
    <div>
      <Header />
      <div className={ style.home }>
        {isAdmin ? <AdminUser data={ admin } />
          : <RegularUser data={ regular } />}
      </div>
    </div>
  );
}
