'use client';

import { Head, useForm, router } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { LoaderCircle, Mail, Lock, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import {useModeAnimation, ThemeAnimationType,} from 'react-theme-switch-animation';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const [isExiting, setIsExiting] = useState(false);

    const {
        ref: toggleRef,
        toggleSwitchTheme,
        isDarkMode,
    } = useModeAnimation({
        animationType: ThemeAnimationType.CIRCLE,
        duration: 800,
        blurAmount: 5,
        globalClassName: 'dark', // pastikan `dark:` di tailwind berfungsi
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const handleOAuth = (provider: string) => {
        window.location.href = `/auth/${provider}`;
    };

    return (
        <div
            className="relative min-h-screen bg-cover bg-center bg-no-repeat transition-all duration-500 ease-in-out"
            style={{ backgroundImage: "url('/storage/images/background.jpeg')" }}
        >
            <Head title="Login" />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm dark:bg-black/70 z-0" />

            {/* Theme toggle */}
           <div className="absolute top-4 right-4 z-50 pointer-events-auto">

                <button
  ref={toggleRef}
  onClick={toggleSwitchTheme}
  aria-label="Toggle dark mode"
  className="p-2 rounded-full transition duration-300 hover:rotate-12 bg-white/20 dark:bg-black/30 backdrop-blur shadow"
>

                    {isDarkMode ? (
                        <Sun className="h-5 w-5 text-yellow-400" />
                    ) : (
                        <Moon className="h-5 w-5 text-blue-400" />
                    )}
                </button>
            </div>

            <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isExiting ? { opacity: 0, y: -100, rotateY: 90 } : { opacity: 1, y: 0, rotateY: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="w-full max-w-md rounded-3xl bg-white/30 p-8 shadow-2xl backdrop-blur-xl dark:bg-zinc-900/50"
                >
                    <motion.h2
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-1 text-center text-3xl font-bold text-zinc-900 dark:text-white"
                    >
                        Welcome Back
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mb-6 text-center text-sm text-muted-foreground"
                    >
                        Login to continue managing your account.
                    </motion.p>

                    {status && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mb-4 rounded bg-green-100 px-4 py-3 text-sm text-green-800 dark:bg-green-900 dark:text-green-200 shadow"
                        >
                            {status}
                        </motion.div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <Label htmlFor="email">Email address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="pl-10"
                                    required
                                    autoFocus
                                />
                            </div>
                            <InputError message={errors.email} />
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                {canResetPassword && (
                                    <a href={route('password.request')} className="text-sm text-blue-500 hover:underline">
                                        Forgot password?
                                    </a>
                                )}
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="pl-10"
                                    required
                                />
                            </div>
                            <InputError message={errors.password} />
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center space-x-2">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onClick={() => setData('remember', !data.remember)}
                            />
                            <Label htmlFor="remember" className="text-sm">Remember me</Label>
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <Button type="submit" className="w-full hover:scale-[1.03]" disabled={processing}>
                                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                Log in
                            </Button>
                        </motion.div>
                    </form>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-muted" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-3">
                        <Button variant="outline" onClick={() => handleOAuth('google')}>
                            <img src="/images/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                            Login with Google
                        </Button>
                        <Button variant="outline" onClick={() => handleOAuth('instagram')}>
                            <img src="/images/instagram.svg" alt="Instagram" className="w-5 h-5 mr-2" />
                            Login with Instagram
                        </Button>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-6 text-center text-sm text-muted-foreground"
                    >
                        Don&apos;t have an account?{' '}
                        <button
                            onClick={() => {
                                setIsExiting(true);
                                setTimeout(() => {
                                    router.visit(route('register'));
                                }, 700);
                            }}
                            className="font-medium text-blue-500 hover:underline transition duration-300"
                        >
                            Sign up
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
