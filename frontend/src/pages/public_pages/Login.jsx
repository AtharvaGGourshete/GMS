import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
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
import { LogIn, Mail, Lock, ArrowRight } from "lucide-react";

const ErrorMessage = ({ errors, name }) =>
  errors[name] ? (
    <p className="text-xs font-black uppercase text-[#F24423] mt-2 bg-red-100 border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
      {errors[name].message}
    </p>
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
          navigate("/admin/landing");
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
    <div className="flex justify-center items-center min-h-screen p-4 bg-gradient-to-br from-cyan-100 via-yellow-50 to-pink-100 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border-8 border-black opacity-20 rotate-45"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-300 border-8 border-black opacity-30"></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-pink-300 border-4 border-black opacity-20"></div>

      <Card className="w-full max-w-md border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white rounded-none relative z-10">
        {/* Decorative corner */}
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#F24423] border-4 border-black"></div>
        
        <CardHeader className="space-y-3 border-b-4 border-black pb-6">
          <div className="flex items-center justify-center mb-2">
            <div className="p-4 bg-cyan-300 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <LogIn className="h-8 w-8 text-black" />
            </div>
          </div>
          <CardTitle className="text-4xl font-black uppercase text-center tracking-tight">
            Login
          </CardTitle>
          <CardDescription className="text-center font-bold uppercase tracking-wide text-sm">
            Access Your Gym Account
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid gap-6 pt-6">
            {/* Email Field */}
            <div className="grid gap-3">
              <Label 
                htmlFor="email" 
                className="font-black uppercase tracking-wide text-sm flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all rounded-none font-bold"
                {...register("email", { required: "Email is required" })}
              />
              <ErrorMessage errors={errors} name="email" />
            </div>

            {/* Password Field */}
            <div className="grid gap-3 mb-10">
              <Label 
                htmlFor="password" 
                className="font-black uppercase tracking-wide text-sm flex items-center gap-2"
              >
                <Lock className="h-4 w-4" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all rounded-none font-bold"
                {...register("password", { required: "Password is required" })}
              />
              <ErrorMessage errors={errors} name="password" />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 border-t-4 border-black pt-6">
            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-black uppercase tracking-wider bg-[#F24423] text-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all rounded-none cursor-pointer"
            >
              Sign In
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            {/* Register Link */}
            <div className="w-full bg-yellow-300 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
              <p className="text-sm font-bold uppercase tracking-wide text-black">
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className="text-[#F24423] hover:underline decoration-4 font-black"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
