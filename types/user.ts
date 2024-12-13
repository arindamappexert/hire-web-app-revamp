export interface User {
  id: number;
  uniqueId: string;
  email: string;
  firstName: string;
  lastName: null;
  phone: null;
  image: null;
  role: Role;
  roles: string[];
}

export interface Role {
  id: number;
  name: string;
  label: string;
  description: string;
}
