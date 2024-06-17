import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FirstFormInputs, firstFormSchema } from 'types/registration';
import { useAuth } from 'context/authContext';
import { useNavigate } from 'react-router-dom';

export function RegisterFirstStep() {
  const { setRegisterData, registerData } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FirstFormInputs>({
    resolver: zodResolver(firstFormSchema),
    defaultValues: {
      email: registerData.email || '',
      password: registerData.password || '',
    },
  });

  const onSubmit: SubmitHandler<FirstFormInputs> = (data) => {
    setRegisterData((prev) => ({ ...prev, ...data }));
    navigate('/register-second');
  };

  return (
    <div className="flex justify-center content-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center w-80 rounded-lg p-5 shadow-lg gap-5"
      >
        <h2>First step</h2>
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

        <div className="flex gap-2 justify-center">
          <button type="submit" className="text-black bg-yellow-500 rounded-lg p-2">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
