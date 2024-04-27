// jeux.model.ts
export enum TypeJeux {
    JEUX_DE_CARTE,
    SPORTS,
    JEUX_VIDEO
  }
  
  export class Jeux {
    idJeux!: number;
    nom!: string;
    typeJeux!: TypeJeux;
    image!: string;
  }
  