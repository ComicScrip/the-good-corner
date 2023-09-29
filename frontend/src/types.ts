export type Ad = {
  title: string;
  description: string;
  owner: string;
  price: number;
  location: string;
  picture: string;
  createdAt: string;
  id: number;
  category?: Category;
};

export type Category = {
  id: number;
  name: string;
};

export type Tag = {
  id: number;
  name: string;
};
