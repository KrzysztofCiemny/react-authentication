import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FirstFormInputs, firstFormSchema } from '@models/registration';
import { useAuth } from '@context/authContext';
import { useNavigate } from 'react-router-dom';
import { FormWrapper } from '@components/Wrapper/FormWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
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

const formFields: (keyof FirstFormInputs)[] = ['email', 'password'];

export function RegisterFirstStep() {
  const { setRegisterData, registerData } = useAuth();
  const navigate = useNavigate();

  const formMethods = useForm<FirstFormInputs>({
    resolver: zodResolver(firstFormSchema),
    defaultValues: {
      email: registerData.email || '',
      password: registerData.password || '',
    },
  });
  const { handleSubmit, control } = formMethods;

  const onSubmit: SubmitHandler<FirstFormInputs> = (data) => {
    setRegisterData((prev) => ({ ...prev, ...data }));
    navigate('/register-second');
  };

  return (
    <FormWrapper>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Register first step</CardTitle>
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
                        <Input
                          type={fieldName === 'password' ? 'password' : 'email'}
                          placeholder={fieldName}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Type your {fieldName}.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button type="submit" variant="outline" className="w-full">
                Next
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </FormWrapper>
  );
}
