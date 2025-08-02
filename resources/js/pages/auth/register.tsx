'use client';

import { Head, useForm, router } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { LoaderCircle, Mail, Lock, User, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useModeAnimation, ThemeAnimationType } from 'react-theme-switch-animation';

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

    const [isExiting, setIsExiting] = useState(false);
    const [formStyle, setFormStyle] = useState<'modern' | 'classic'>('modern');
    const [currentStep, setCurrentStep] = useState(1);

    const {
        ref: toggleRef,
        toggleSwitchTheme,
        isDarkMode,
    } = useModeAnimation({
        animationType: ThemeAnimationType.CIRCLE,
        duration: 800,
        blurAmount: 4,
        globalClassName: 'dark',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className={`min-h-screen transition-all duration-500 ${formStyle === 'modern' ? 'bg-[url("/storage/images/register-side.jpg")] bg-cover bg-center' : 'bg-white dark:bg-zinc-900'}`}>
            <Head title="Register" />

            {/* Switch Buttons */}
            <div className="absolute top-4 right-4 z-50 pointer-events-auto space-x-2 flex">
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
                <button
                    onClick={() => setFormStyle(formStyle === 'modern' ? 'classic' : 'modern')}
                    className="p-2 rounded-full bg-white/20 dark:bg-black/30 text-white text-xs font-semibold backdrop-blur shadow"
                >
                    Switch to {formStyle === 'modern' ? 'Classic' : 'Modern'}
                </button>
            </div>

            <div className={`min-h-screen flex items-center justify-center px-4 py-10 ${formStyle === 'classic' ? 'bg-white dark:bg-zinc-900' : ''}`}>
                {formStyle === 'classic' ? (
                    <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl mx-auto bg-white dark:bg-zinc-800 shadow-lg rounded-lg overflow-hidden">
                        {/* Gambar di Samping */}
                        <div className="hidden md:block w-1/2">
                            <img
                                src="storage/images/register-side.jpg"
                                alt="Register Illustration"
                                className="object-cover w-full h-full"
                            />
                        </div>

                        {/* Form */}
                        <div className="w-full md:w-1/2 p-8">
                            <h2 className="mb-1 text-2xl md:text-3xl font-bold text-center text-zinc-900 dark:text-white">
                                Register
                            </h2>
                            <p className="mb-6 text-center text-sm text-muted-foreground">Step {currentStep} of 2</p>

                            <form onSubmit={submit} className="space-y-5">
                                {currentStep === 1 && (
                                    <>
                                        <div>
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.name} />
                                        </div>

                                        <div>
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.email} />
                                        </div>
                                    </>
                                )}

                                {currentStep === 2 && (
                                    <>
                                        <div>
                                            <Label htmlFor="password">Password</Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.password} />
                                        </div>

                                        <div>
                                            <Label htmlFor="password_confirmation">Confirm Password</Label>
                                            <Input
                                                id="password_confirmation"
                                                type="password"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.password_confirmation} />
                                        </div>
                                    </>
                                )}

                                <div className="flex justify-between pt-2">
                                    {currentStep > 1 && (
                                        <Button type="button" variant="outline" onClick={() => setCurrentStep((s) => s - 1)}>
                                            Back
                                        </Button>
                                    )}
                                    {currentStep < 2 ? (
                                        <Button type="button" onClick={() => setCurrentStep((s) => s + 1)}>
                                            Next
                                        </Button>
                                    ) : (
                                        <Button type="submit" disabled={processing}>
                                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                            Register
                                        </Button>
                                    )}
                                </div>
                            </form>

                            <div className="mt-6 text-center text-sm text-muted-foreground">
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
                            </div>
                        </div>
                    </div>
                ) : (
                    // FORM MODERN
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isExiting ? { opacity: 0, y: -100, rotateY: 90 } : { opacity: 1, y: 0, rotateY: 0 }}
                        transition={{ duration: 0.7, ease: 'easeInOut' }}
                        className="w-full max-w-md rounded-3xl p-8 shadow-2xl backdrop-blur-xl bg-white/30 dark:bg-zinc-900/50"
                    >
                        <h2 className="mb-1 text-center text-3xl font-bold text-zinc-900 dark:text-white">
                            Create an Account
                        </h2>
                        <p className="mb-6 text-center text-sm text-muted-foreground">
                            Enter your details to register a new account.
                        </p>

                        <form onSubmit={submit} className="space-y-5">
                            <div>
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
                            </div>

                            <div>
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
                            </div>

                            <div>
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
                            </div>

                            <div>
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
                            </div>

                            <Button
                                type="submit"
                                className="w-full transition duration-200 hover:scale-[1.03] hover:shadow-lg"
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                Create Account
                            </Button>
                        </form>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
