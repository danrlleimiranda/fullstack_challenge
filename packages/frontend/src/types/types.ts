export type DataType = {
  id: number,
  fullName: string,
  username: string,
  email: string,
  password: string,
  admin: boolean,
  image: string,
  address: {
    street: string,
    city: string
    district: string
    number: number;
  }
};
