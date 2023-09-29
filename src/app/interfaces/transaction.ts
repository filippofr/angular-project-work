import { BankAccount } from "./bank-account";
import { Category } from "./category";

export interface Transaction {
  bankAccount: BankAccount;
  date: string;
  balance: number;
  amount: number;
  category: Category;
  description: string;
  id: string;
}
