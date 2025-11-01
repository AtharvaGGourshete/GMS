import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "@/axios";
import { useAuth } from "../../context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ErrorMessage = ({ errors, name }) =>
  errors[name] ? (
    <p className="text-sm font-medium text-destructive mt-1">{errors[name].message}</p>
  ) : null;

export default function Login() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    setError("email", { message: null });
    setError("password", { message: null });

    try {
      const response = await api.post("/auth/login", {
        email: values.email,
        password: values.password,
      });

      const { user, token } = response.data;
      login(user, token);
      toast.success("Logged in successfully!");

      // Role-based redirection
      switch (user.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "trainer":
          navigate("/trainer/dashboard");
          break;
        case "member":
        default:
          navigate("/member/dashboard");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
      setError("email", { type: "server", message: error.response?.data?.message });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-sm mb-20 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email", { required: "Email is required" })}
              />
              <ErrorMessage errors={errors} name="email" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password", { required: "Password is required" })}
              />
              <ErrorMessage errors={errors} name="password" />
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" className="w-full mt-4 cursor-pointer">
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
