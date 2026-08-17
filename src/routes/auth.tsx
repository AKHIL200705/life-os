import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";

import { CoreOrb } from "@/components/lifeos/CoreOrb";
import { Logo } from "@/components/lifeos/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in to LIFEOS — Proactive Life Intelligence" },
      {
        name: "description",
        content:
          "Sign in or create your LIFEOS account to access the friction prediction command center, digital twin and action engine.",
      },
      { property: "og:title", content: "Sign in to LIFEOS" },
      {
        property: "og:description",
        content: "Access your LIFEOS command center — predict everyday friction before it happens.",
      },
    ],
  }),
  component: AuthPage,
});

const signInSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signUpSchema = signInSchema.extend({
  displayName: z.string().min(2, "Tell us what to call you"),
});

function AuthPage() {
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const [busy, setBusy] = useState<null | "google" | "email">(null);

  useEffect(() => {
    if (!loading && session) void navigate({ to: "/dashboard" });
  }, [loading, session, navigate]);

  const signInForm = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "", displayName: "" },
  });

  async function handleGoogle() {
    setBusy("google");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      setBusy(null);
      toast.error("Google sign-in failed", { description: error.message });
      return;
    }
  }

  async function handleSignIn(values: z.infer<typeof signInSchema>) {
    setBusy("email");
    const { error } = await supabase.auth.signInWithPassword(values);
    setBusy(null);
    if (error) {
      toast.error("Could not sign in", { description: error.message });
      return;
    }
    toast.success("Welcome back to LIFEOS");
    void navigate({ to: "/dashboard" });
  }

  async function handleSignUp(values: z.infer<typeof signUpSchema>) {
    setBusy("email");
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { display_name: values.displayName },
      },
    });
    setBusy(null);
    if (error) {
      toast.error("Could not create your account", { description: error.message });
      return;
    }
    toast.success("Account created", { description: "Let's build your digital twin." });
    void navigate({ to: "/onboarding" });
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <section className="relative hidden overflow-hidden border-r border-border p-10 lg:flex lg:flex-col lg:justify-between">
        <div className="grid-bg absolute inset-0 opacity-50" aria-hidden />
        <div className="relative">
          <Logo />
          <p className="mt-10 max-w-sm text-2xl font-semibold leading-snug tracking-tight text-gradient">
            Understand. Predict. Reason. Recommend. Act. Learn.
          </p>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            LIFEOS reads your permitted context and surfaces the problems that are about to happen —
            with the reasoning behind every recommendation.
          </p>
        </div>
        <div className="relative">
          <CoreOrb size={300} status="Standing by" />
        </div>
        <p className="relative text-xs text-muted-foreground">
          Prototype build · demo predictions are simulated and clearly labelled.
        </p>
      </section>

      <section className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-sm">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" /> Back to overview
          </Link>

          <h1 className="text-2xl font-semibold tracking-tight">Enter LIFEOS</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your context stays private by default — permissions are opt-in.
          </p>

          <Button
            variant="outline"
            className="mt-6 w-full"
            onClick={() => void handleGoogle()}
            disabled={busy !== null}
          >
            {busy === "google" ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <GoogleMark className="mr-2 size-4" />
            )}
            Continue with Google
          </Button>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              or email
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <Tabs defaultValue="signin">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign in</TabsTrigger>
              <TabsTrigger value="signup">Create account</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="mt-5">
              <form className="space-y-4" onSubmit={signInForm.handleSubmit(handleSignIn)}>
                <Field
                  id="signin-email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  registration={signInForm.register("email")}
                  error={signInForm.formState.errors.email?.message}
                />
                <Field
                  id="signin-password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  registration={signInForm.register("password")}
                  error={signInForm.formState.errors.password?.message}
                />
                <Button type="submit" className="w-full" disabled={busy !== null}>
                  {busy === "email" ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
                  Sign in
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="mt-5">
              <form className="space-y-4" onSubmit={signUpForm.handleSubmit(handleSignUp)}>
                <Field
                  id="signup-name"
                  label="Name"
                  autoComplete="name"
                  registration={signUpForm.register("displayName")}
                  error={signUpForm.formState.errors.displayName?.message}
                />
                <Field
                  id="signup-email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  registration={signUpForm.register("email")}
                  error={signUpForm.formState.errors.email?.message}
                />
                <Field
                  id="signup-password"
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  registration={signUpForm.register("password")}
                  error={signUpForm.formState.errors.password?.message}
                />
                <Button type="submit" className="w-full" disabled={busy !== null}>
                  {busy === "email" ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
                  Create account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  registration,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  registration: ReturnType<ReturnType<typeof useForm>["register"]>;
  type?: string | undefined;
  autoComplete?: string | undefined;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        {...registration}
      />
      {error ? (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function GoogleMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.2 1.3-1.6 3.9-5.5 3.9-3.3 0-6-2.8-6-6.1S8.7 5.8 12 5.8c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 3.1 14.7 2.2 12 2.2 6.6 2.2 2.2 6.6 2.2 12S6.6 21.8 12 21.8c5.7 0 9.4-4 9.4-9.6 0-.7-.1-1.2-.2-1.9H12z"
      />
    </svg>
  );
}
