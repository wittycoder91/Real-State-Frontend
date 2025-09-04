import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "../schema/authSchema";
import { Form } from "@/components/ui/form";
import AppFormField from "@/components/AppFormField";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, setCurrentUser } from "@/service/mockAuth";
import { loginSuccess } from "@/store/authReducer";
import { demoCredentials } from "@/data/mockData";

const formDetials = [
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

const LoginForm = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@demo.com",
      password: "admin123",
    },
  });
  const dispatch = useDispatch();
  const {
    formState: { isSubmitting },
  } = form;
  
  const onUserLogin = async (values) => {
    const user = await loginUser(values);
    if (!user) return;
    
    // Set current user in localStorage
    setCurrentUser(user.user);
    
    dispatch(
      loginSuccess({ userEmail: user.user.email, userUid: user.user.uid })
    );
    
    // Navigate based on user role
    if (user.user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <Form {...form}>
      <div className="grid gap-4">
        {/* Demo Credentials Info */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Demo Credentials:</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p><strong>Admin:</strong> {demoCredentials.admin.email} / {demoCredentials.admin.password}</p>
            <p><strong>User:</strong> {demoCredentials.user.email} / {demoCredentials.user.password}</p>
          </div>
        </div>
        
        <form onSubmit={form.handleSubmit(onUserLogin)} className="grid gap-2">
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
            Login
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default LoginForm;
