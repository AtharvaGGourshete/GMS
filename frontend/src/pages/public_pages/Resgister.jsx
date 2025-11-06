import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import api from '@/axios';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2, UserPlus, User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function RegisterForm() {
    const navigate = useNavigate();
    const form = useForm({
        defaultValues: { full_name: '', email: '', password: '', confirmPassword: '', phone: '' },
    });
    const { isSubmitting } = form.formState;
    
    const onSubmit = async (values) => {
        if (values.password !== values.confirmPassword) {
            form.setError('confirmPassword', {
                type: 'manual',
                message: 'Passwords do not match.',
            });
            return;
        }

        try {
            const dataToSend = {
                full_name: values.full_name,
                email: values.email,
                password: values.password, 
                phone: values.phone || null, 
            };

            const response = await api.post('/auth/register', dataToSend);
            
            console.log("Registration successful:", response.data.message);
            toast.success("Registration successful!");
            navigate('/login'); 
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
            console.error("Registration failed:", errorMessage);
            toast.error(errorMessage);
            form.setError('email', { message: errorMessage });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4 bg-gradient-to-br from-pink-100 via-yellow-50 to-cyan-100 relative overflow-hidden mb-20">
            {/* Decorative background elements */}
            <div className="absolute top-10 right-10 w-32 h-32 border-8 border-black opacity-20 rotate-12"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-cyan-300 border-8 border-black opacity-30 rotate-45"></div>
            <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-yellow-300 border-4 border-black opacity-20"></div>

            <Card className="w-full max-w-lg border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white rounded-none relative z-10">
                {/* Decorative corners */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-300 border-4 border-black"></div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-pink-300 border-4 border-black"></div>

                <CardHeader className="border-b-4 border-black pb-6">
                    <div className="flex items-center justify-center mb-4">
                        <div className="p-4 bg-green-300 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <UserPlus className="h-8 w-8 text-black" />
                        </div>
                    </div>
                    <CardTitle className="text-4xl font-black uppercase text-center tracking-tight">
                        Join <span className="text-[#F24423]">Gymie</span>
                    </CardTitle>
                    <p className="text-center font-bold uppercase tracking-wide text-sm mt-2">
                        Create Your Fitness Account
                    </p>
                </CardHeader>

                <CardContent className="pt-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            
                            {/* Full Name */}
                            <FormField
                                control={form.control}
                                name="full_name" 
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-black uppercase tracking-wide text-sm flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            Full Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="John Doe" 
                                                {...field} 
                                                disabled={isSubmitting}
                                                className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all rounded-none font-bold"
                                            />
                                        </FormControl>
                                        <FormMessage className="font-bold text-xs mt-2" />
                                    </FormItem>
                                )}
                            />

                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-black uppercase tracking-wide text-sm flex items-center gap-2">
                                            <Mail className="h-4 w-4" />
                                            Email Address
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="you@example.com" 
                                                type="email" 
                                                {...field} 
                                                disabled={isSubmitting}
                                                className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all rounded-none font-bold"
                                            />
                                        </FormControl>
                                        <FormMessage className="font-bold text-xs mt-2" />
                                    </FormItem>
                                )}
                            />

                            {/* Phone */}
                            <FormField
                                control={form.control}
                                name="phone" 
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-black uppercase tracking-wide text-sm flex items-center gap-2">
                                            <Phone className="h-4 w-4" />
                                            Phone (Optional)
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="123-456-7890" 
                                                {...field} 
                                                disabled={isSubmitting}
                                                className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all rounded-none font-bold"
                                            />
                                        </FormControl>
                                        <FormMessage className="font-bold text-xs mt-2" />
                                    </FormItem>
                                )}
                            />

                            {/* Password */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-black uppercase tracking-wide text-sm flex items-center gap-2">
                                            <Lock className="h-4 w-4" />
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="password" 
                                                placeholder="••••••••" 
                                                {...field} 
                                                disabled={isSubmitting}
                                                className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all rounded-none font-bold"
                                            />
                                        </FormControl>
                                        <FormMessage className="font-bold text-xs mt-2" />
                                    </FormItem>
                                )}
                            />

                            {/* Confirm Password */}
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-black uppercase tracking-wide text-sm flex items-center gap-2">
                                            <Lock className="h-4 w-4" />
                                            Confirm Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="password" 
                                                placeholder="••••••••" 
                                                {...field} 
                                                disabled={isSubmitting}
                                                className="h-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all rounded-none font-bold"
                                            />
                                        </FormControl>
                                        <FormMessage className="font-bold text-xs mt-2" />
                                    </FormItem>
                                )}
                            />

                            {/* Submit Button */}
                            <Button 
                                type="submit" 
                                className="w-full h-14 text-lg font-black uppercase tracking-wider bg-[#F24423] text-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all rounded-none mt-6" 
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> 
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </Form>

                    {/* Login Link */}
                    <div className="mt-6 bg-cyan-300 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
                        <p className="text-sm font-bold uppercase tracking-wide text-black">
                            Already have an account?{' '}
                            <Link 
                                to="/login" 
                                className="text-[#F24423] hover:underline decoration-4 font-black"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
