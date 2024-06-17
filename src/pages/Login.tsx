import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '@context/authContext';
import { NavLink } from 'react-router-dom';
import { Button, buttonVariants } from '@components/ui/button';
import { FormWrapper } from '@components/Wrapper/FormWrapper';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@components/ui/card';
import { Checkbox } from '@components/ui/checkbox';
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

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  isRemembered: z.boolean(),
});

type FormInputs = z.infer<typeof formSchema>;

export function Login() {
  const { handleLogin } = useAuth();

  const formMethods = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '', isRemembered: false },
  });
  const { handleSubmit, control } = formMethods;

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    handleLogin(data);
  };

  return (
    <FormWrapper>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...formMethods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col justify-center w-80  gap-5"
            >
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
                    </FormControl>
                    <FormDescription>Type your email.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="password" {...field} />
                    </FormControl>
                    <FormDescription>Type your password.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="isRemembered"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="text-sm font-medium leading-none">Remember me</FormLabel>
                  </FormItem>
                )}
              />
              <Button variant="outline" type="submit">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center w-full font-bold pb-4">Or</div>
          <NavLink
            to="/register-first"
            className={`${buttonVariants({ variant: 'outline' })} w-full`}
          >
            Sign up
          </NavLink>
        </CardFooter>
      </Card>
    </FormWrapper>
  );
}
