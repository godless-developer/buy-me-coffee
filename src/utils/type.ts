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
  about: string;
  socialMediaURL: string;
  successMessage?: string;
  backgroundImage?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
};
