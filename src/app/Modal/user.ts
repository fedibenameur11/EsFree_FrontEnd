export interface User {
    id: number;
    email: string;
    password: string;
    role: string;
    phoneNumber: number;
    enabled: boolean;
    username: string;
    authorities: Authority[];
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    accountNonExpired: boolean;
  }
  
  interface Authority {
    authority: string;
  }