import { useState } from 'react';

const useForms = (initialState: any) => {
  const [form, setForm] = useState(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setForm((prevState: any) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return {
    handleChange,
    form,
    setForm,
  };
};

export default useForms;
