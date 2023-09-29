import { User } from "./user";

export interface BankAccount {
  id?: string;
  creationDate: Date;
  iban: string;
  user: User;
}