export type StylePropsComponent<T> = T & StyleClass;

interface StyleClass {
  className: string;
}

export interface IMessage {
  id: number;
  user: string;
  message: string;
  time: string;
}

export interface IRoom {
  id: number;
  name: string;
  recent: string;
  time: string;
}
