import { Role } from "./role";

export class User {
    userName!: string;
    userFirstName!: string;
    userLastName!: string;
    userPassword!: string;
    roles!: Role[]; // Relation Many-to-Many avec Role
  }