export type tagType = {
  name: string;
  id: string;
};

export type FormData = {
  details?: string;
  desc?: string;
  tags?: tagType[];
  title?: string;
  authRef?: {
    _id: string;
    username: string;
  };
  username?: string;
  _id?: string;
  updatedAt?: string;
  createdAt?: string;
  image?: string;
};
