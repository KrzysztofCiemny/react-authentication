import { useAuth } from '@context/authContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SecondFormInputs, secondFormSchema } from '@models/registration';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@models/context';
import { FormWrapper } from '@components/Wrapper/FormWrapper';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@components/ui/card';
import { Button } from '@components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';

const formFields: (keyof SecondFormInputs)[] = ['name', 'age'];

export function RegisterSecondStep() {
  const { registerData, handleRegister } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!registerData.email || !registerData.password) {
      navigate('/register-first');
    }
  }, []);

  const formMethods = useForm<SecondFormInputs>({
    resolver: zodResolver(secondFormSchema),
    defaultValues: { name: '', age: '' },
  });
  const { handleSubmit, control } = formMethods;

  const goToPrevStep = () => {
    navigate('/register-first');
  };

  const onSubmit: SubmitHandler<SecondFormInputs> = (data) => {
    const finalUserData = { ...registerData, ...data };

    handleRegister(finalUserData as User);
  };

  return (
    <FormWrapper>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Register second step</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...formMethods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col justify-center w-80 gap-5"
            >
              {formFields.map((fieldName) => (
                <FormField
                  key={fieldName}
                  control={control}
                  name={fieldName}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{fieldName}</FormLabel>
                      <FormControl>
                        <Input placeholder={fieldName} {...field} />
                      </FormControl>
                      <FormDescription>Type your {fieldName}.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button type="submit" variant="outline" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button type="button" onClick={goToPrevStep} variant="outline" className="w-full">
            Back to step one
          </Button>
        </CardFooter>
      </Card>
    </FormWrapper>
  );
}
