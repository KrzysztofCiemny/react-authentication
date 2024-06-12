import { useAuth } from 'context/authContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SecondFormInputs, secondFormSchema } from 'types/registration';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'types/context';

export function RegisterSecondStep() {
  const { registerData, handleRegister } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!registerData.email || !registerData.password) {
      navigate('/register-first');
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SecondFormInputs>({ resolver: zodResolver(secondFormSchema) });

  const goToPrevStep = () => {
    navigate('/register-first');
  };

  const onSubmit: SubmitHandler<SecondFormInputs> = (data) => {
    const finalUserData = { ...registerData, ...data };

    handleRegister(finalUserData as User);
  };

  return (
    <div className="flex justify-center content-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center w-80 rounded-lg p-5 shadow-lg gap-5"
      >
        <h2>Second step</h2>
        <input
          {...register('name')}
          type="text"
          placeholder="name"
          className="shadow-sm p-2 rounded-md"
        />
        {errors.name && <div className="text-red-500">{errors.name.message}</div>}
        <input
          {...register('age')}
          type="text"
          placeholder="age"
          className="shadow-sm p-2 rounded-md"
        />
        {errors.age && <div className="text-red-500">{errors.age.message}</div>}
        <div className="flex gap-2 justify-center">
          <button
            type="button"
            onClick={goToPrevStep}
            className="text-black bg-yellow-500 rounded-lg p-2"
          >
            Back
          </button>
          <button type="submit" className="text-black bg-yellow-500 rounded-lg p-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
