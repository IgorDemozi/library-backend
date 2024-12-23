interface IUser {
  email: string;
  password: string;
}

class User {
  email: string;
  password: string;

  constructor(props: IUser) {
    Object.assign(this, props);
  }
}

export { User };
