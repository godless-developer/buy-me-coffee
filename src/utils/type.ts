export type LoginTypes = {
  id: string;
  email: string;
  password: string;
  username: string;
};

export type CreatorsTypes = {
  id: number;
  name: string;
  avatar: string;
  about: string;
  socialUrl: string;
};
export type Profile = {
  id?: string;
  name: string;
  avatarImage?: string;
  coverImg?: string;
  about: string;
  socialMediaURL: string;
  successMessage?: string;
  backgroundImage?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ProfilePaid = {
  id: string;
  country: string;
  firstName: string;
  lastName: string;
  cardNumber: string;
  expireMonth: string;
  expireYear: string;
  cvc: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
