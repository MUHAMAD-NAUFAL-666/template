import { Head, useForm, router } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';
import { LoaderCircle, Mail, Lock, User, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const [isExiting, setIsExiting] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <div
            className="relative min-h-screen bg-cover bg-center bg-no-repeat transition-all duration-500 ease-in-out"
            style={{ backgroundImage: "url('/storage/images/background.jpeg')" }}
        >
            <Head title="Register" />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm dark:bg-black/70 z-0" />

            {/* Dark mode toggle */}
            <div className="absolute top-4 right-4 z-10">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsDark(!isDark)}
                    aria-label="Toggle dark mode"
                    className="transition duration-300 hover:rotate-12"
                >
                    {isDark ? (
                        <motion.div initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} transition={{ duration: 0.3 }}>
                            <Sun className="h-5 w-5 text-yellow-400" />
                        </motion.div>
                    ) : (
                        <motion.div initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} transition={{ duration: 0.3 }}>
                            <Moon className="h-5 w-5 text-blue-400" />
                        </motion.div>
                    )}
                </Button>
            </div>

            <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isExiting ? { opacity: 0, y: -100, rotateY: 90 } : { opacity: 1, y: 0, rotateY: 0 }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                    className="w-full max-w-md rounded-3xl bg-white/30 p-8 shadow-2xl backdrop-blur-xl dark:bg-zinc-900/50"
                >
                    <motion.h2
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-1 text-center text-3xl font-bold text-zinc-900 dark:text-white"
                    >
                        Create an Account
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-6 text-center text-sm text-muted-foreground"
                    >
                        Enter your details to register a new account.
                    </motion.p>

                    <form onSubmit={submit} className="space-y-5">
                        {/* Name */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                            <Label htmlFor="name">Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Full name"
                                    className="pl-10"
                                    required
                                />
                            </div>
                            <InputError message={errors.name} />
                        </motion.div>

                        {/* Email */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                            <Label htmlFor="email">Email address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="email@example.com"
                                    className="pl-10"
                                    required
                                />
                            </div>
                            <InputError message={errors.email} />
                        </motion.div>

                        {/* Password */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    className="pl-10"
                                    required
                                />
                            </div>
                            <InputError message={errors.password} />
                        </motion.div>

                        {/* Confirm Password */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                            <Label htmlFor="password_confirmation">Confirm Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="••••••••"
                                    className="pl-10"
                                    required
                                />
                            </div>
                            <InputError message={errors.password_confirmation} />
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                            <Button
                                type="submit"
                                className="w-full transition duration-200 hover:scale-[1.03] hover:shadow-lg"
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                Create Account
                            </Button>
                        </motion.div>
                    </form>

                    {/* Divider */}
<div className="relative my-4">
    <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-muted" />
    </div>
    <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">Or register with</span>
    </div>
</div>

<div className="flex flex-col space-y-3">
    <Button variant="outline" onClick={() => window.location.href = '/auth/google'}>
        <img src="/images/google.svg" alt="Google" className="w-5 h-5 mr-2" />
        Register with Google
    </Button>
    <Button variant="outline" onClick={() => window.location.href = '/auth/instagram'}>
        <img src="/images/instagram.svg" alt="Instagram" className="w-5 h-5 mr-2" />
        Register with Instagram
    </Button>
</div>


                    {/* Back to login */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="mt-6 text-center text-sm text-muted-foreground"
                    >
                        Already have an account?{' '}
                        <button
                            onClick={() => {
                                setIsExiting(true);
                                setTimeout(() => {
                                    router.visit(route('login'));
                                }, 700);
                            }}
                            className="font-medium text-blue-500 hover:underline transition duration-300"
                        >
                            Log in
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
