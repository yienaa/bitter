export type StylePropsComponent<T = any> = T & StyleClass;

interface StyleClass {
  className: string;
}

export interface IMessage {
  id: string;
  user: string;
  message: string;
  time: string;
}

export interface IRoom {
  id: string;
  name: string;
  time: number;
  recent?: string;
}
