import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '../context/authContext';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  isRemembered: z.boolean(),
});

type FormInputs = z.infer<typeof formSchema>;

export function Login() {
  const { handleLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ resolver: zodResolver(formSchema) });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    handleLogin(data);
  };

  return (
    <div className="flex justify-center content-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center w-80 rounded-lg p-5 shadow-lg gap-5"
      >
        <input
          {...register('email')}
          type="text"
          placeholder="email"
          className="shadow-sm p-2 rounded-md"
        />
        {errors.email && <div className="text-red-500">{errors.email.message}</div>}
        <input
          {...register('password')}
          type="password"
          placeholder="password"
          className="shadow-sm p-2 rounded-md"
        />
        {errors.password && <div className="text-red-500">{errors.password.message}</div>}
        <div className="flex justify-center gap-2">
          <input
            {...register('isRemembered')}
            type="checkbox"
            id="rememberMe"
            className="cursor-pointer"
          />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>
        <button type="submit" className="text-black bg-yellow-500 rounded-lg py-2">
          Submit
        </button>
      </form>
    </div>
  );
}
