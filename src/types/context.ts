import { z } from 'zod';
import { FirstFormInputs, SecondFormInputs } from 'types/registration';

export const UserSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string().optional(),
  age: z.string().optional(),
  isRemembered: z.boolean().optional(),
});

export type User = z.infer<typeof UserSchema>;
export type RegisterFormInputs = Partial<FirstFormInputs & SecondFormInputs>;

export type ContextProviderValue = {
  user: User | null;
  handleLogin: (data: User) => void;
  handleRegister: (data: User) => void;
  handleLogout: () => void;
  getStoredData: <T extends StoredData>(item: string) => T | null;
  loading: boolean;
  isNavigatePublic: boolean;
  registerData: RegisterFormInputs;
  setRegisterData: React.Dispatch<React.SetStateAction<RegisterFormInputs>>;
};

export type StoredData = User | boolean | null;
