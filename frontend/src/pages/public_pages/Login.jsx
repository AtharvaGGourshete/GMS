import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import api from "@/axios";
import { useAuth } from "@/context/AuthContext";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    setError("email", null);
    setError("password", null);

    try {
      const res = await api.post("/auth/login", {
        email: values.email,
        password: values.password,
      });

      const { user, token } = res.data;
      login(user, token);
      toast.success("Logged in");

      // role-based navigation
      if (user?.role === "admin") navigate("/admin/landing");
      else if (user?.role === "trainer") navigate("/trainer/landing");
      else navigate("/member/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      toast.error(msg);
      setError("email", { type: "server", message: msg });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-50 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md rounded-2xl border border-slate-100 shadow-md">
        <CardHeader className="p-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Sign in to your account</h1>
          <p className="text-sm text-slate-600 mt-2">Enter your credentials to continue</p>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="mt-2"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-xs text-rose-600 mt-2">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium text-slate-700">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="mt-2"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-xs text-rose-600 mt-2">{errors.password.message}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="p-6 grid">
            <Button type="submit" className="w-full rounded-full py-3" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>

            <div className="mt-4 text-center">
              <p className="text-sm text-slate-600">
                Don’t have an account?{" "}
                <Link to="/register" className="text-slate-900 font-medium underline">
                  Create one
                </Link>
              </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
