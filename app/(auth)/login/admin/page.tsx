"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { EyeIcon } from "lucide-react";
import { LoginFormData, loginSchema } from "@/lib/validations/auth";
import { useToast } from "@/lib/hooks/use-toast";
import Image from "next/image";
import { useAuth } from "@/lib/auth/context";
import { SelectSeparator } from "@/components/ui/select";
import { SSOButton } from "@/components/auth/sso-button";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const { login, enabledProviders } = useAuth();

  console.log(enabledProviders, "enabledProviders");

  const handleSSOLogin = async (providerLogin: () => Promise<string | void>) => {
    try {
      await providerLogin();
      router.push('/admin/dashboard');
    } catch (error) {
      console.error("SSO login failed:", error);
      toast({
        title: "Login failed",
        description: "Could not sign in with selected provider",
      });
    }
  };

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      router.push('/admin/dashboard');
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        title: "Invalid credentials",
      });
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col gap-4 justify-center items-center bg-[#1e2147] p-12 lg:flex">
        <div>
          <div className="text-white">
            <Image
              src="/images/appexert-logo-white.svg"
              alt="appexert white logo"
              width={400}
              height={50}
            />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white">
          Global Hiring, Simplified.
        </h1>
      </div>

      <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-tight">
              Login to your account
            </h2>
            <p className="text-muted-foreground">
              Enter your login details to continue
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="space-y-4"
            >
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Password"
                          type={showPassword ? "text" : "password"}
                          autoCapitalize="none"
                          autoComplete="current-password"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 h-6 w-6"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
              >
                Sign in
              </Button>
            </form>
          </Form>

          {enabledProviders.length > 0 && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <SelectSeparator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {enabledProviders.map((provider) => (
                  <SSOButton
                    key={provider.id}
                    name={provider.name}
                    icon={provider.icon}
                    onClick={() => handleSSOLogin(provider.login)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
