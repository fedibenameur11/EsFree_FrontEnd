import { User } from "./user";

export class Maison {
    id_maison!: number;
    adresse!: string;
    prix!: number;
    description!: string;
    images!: string[];
    user!: User ; 
}
