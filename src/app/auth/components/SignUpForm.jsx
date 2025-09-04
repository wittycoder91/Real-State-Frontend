import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { sighUpSchema } from "../schema/authSchema";
import { Form } from "@/components/ui/form";
import AppFormField from "@/components/AppFormField";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";
import { createUser, setCurrentUser } from "@/service/mockAuth";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/authReducer";

const formDetials = [
  {
    name: "username",
    label: "Username",
    inputType: "text",
    inputPlaceholder: "dhanush theijas",
  },
  {
    name: "email",
    label: "Email",
    inputType: "text",
    inputPlaceholder: "sample@gmail.com",
  },
  {
    name: "password",
    label: "Password",
    inputType: "password",
    inputPlaceholder: "*******",
  },
];

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(sighUpSchema),
    defaultValues: {
      username: "demo user",
      email: "demo@gmail.com",
      password: "demo123",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;
  
  const handleFormSubmit = async (values) => {
    const user = await createUser(values);
    if (!user) return;
    
    // Set current user in localStorage
    setCurrentUser(user.user);
    
    dispatch(
      loginSuccess({ userEmail: user.user.email, userUid: user.user.uid })
    );
    
    // Navigate to home page for new users
    navigate("/");
  };

  return (
    <Form {...form}>
      <div className="grid gap-4">
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="grid gap-2"
        >
          {formDetials.map((formItems) => (
            <AppFormField
              form={form}
              inputPlaceholder={formItems.inputPlaceholder}
              inputType={formItems.inputType}
              label={formItems.label}
              name={formItems.name}
              key={formItems.name}
              isPending={isSubmitting}
            />
          ))}

          <Button type="submit" disabled={isSubmitting} className="w-full mt-6">
            {isSubmitting ? "Loading..." : "Sign Up"}
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default SignUpForm;
