"use client"

import { useRouter } from "next/navigation"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AppIcon from "@/components/app-icon"

export default function SignUpPage() {
  const router = useRouter()

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmitAsync: async ({ value }) => {
        // Client-side validation before server call
        if (value.password !== value.confirmPassword) {
          return {
            fields: {
              confirmPassword: "Passwords do not match",
            },
          }
        }
        return null
      },
    },
    onSubmit: async ({ value }) => {
      try {
        const { data, error } = await authClient.signUp.email({
          name: value.name,
          email: value.email,
          password: value.password,
          callbackURL: "/",
        })

        if (error) {
          // Handle different error types from better-auth
          if (error.status === 400) {
            // Handle specific validation errors from server
            if (error.message?.includes("email")) {
              // Set field-specific error for email
              form.setFieldMeta("email", (prev) => ({
                ...prev,
                errors: ["This email is already registered or invalid"],
                errorMap: {
                  onSubmit: "This email is already registered or invalid",
                },
                isValid: false,
              }))
            } else if (error.message?.includes("password")) {
              // Set field-specific error for password
              form.setFieldMeta("password", (prev) => ({
                ...prev,
                errors: ["Password requirements not met"],
                errorMap: {
                  onSubmit: "Password requirements not met",
                },
                isValid: false,
              }))
            } else {
              // Generic form error
              toast.error(error.message || "Sign up failed. Please try again.")
            }
          } else {
            // Other server errors
            toast.error(
              error.message || "An unexpected error occurred. Please try again."
            )
          }

          toast.error(error.message || "Sign up failed")
          return
        }

        if (data) {
          toast.success(
            "Account created successfully! Please check your email for verification."
          )
          router.push("/sign-in")
        }
      } catch (err) {
        console.error("Sign up error:", err)
        toast.error("Network error. Please try again.")
      }
    },
  })

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-md">
        <Card className="flex flex-col gap-6 p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2">
                <a
                  href="#"
                  className="flex flex-col items-center gap-2 font-medium"
                >
                  <div className="flex size-8 items-center justify-center rounded-md">
                    <AppIcon className="size-6" />
                  </div>
                  <span className="sr-only">Bookmarks</span>
                </a>
                <h1 className="text-xl font-bold">Create your account</h1>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <a href="/sign-in" className="underline underline-offset-4">
                    Sign in
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="grid gap-2">
                  <form.Field
                    name="name"
                    validators={{
                      onChange: ({ value }) => {
                        if (!value || value.length < 2) {
                          return "Name must be at least 2 characters"
                        }
                        if (value.length > 50) {
                          return "Name must be less than 50 characters"
                        }
                        return undefined
                      },
                    }}
                  >
                    {(field) => (
                      <>
                        <Label htmlFor={field.name}>Name</Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="text"
                          placeholder="John Doe"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {!field.state.meta.isValid &&
                        field.state.meta.errors.length > 0 ? (
                          <p className="text-destructive text-xs" role="alert">
                            {String(field.state.meta.errors[0])}
                          </p>
                        ) : null}
                      </>
                    )}
                  </form.Field>
                </div>

                <div className="grid gap-2">
                  <form.Field
                    name="email"
                    validators={{
                      onChange: ({ value }) => {
                        if (!value) {
                          return "Email is required"
                        }
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                        if (!emailRegex.test(value)) {
                          return "Please enter a valid email address"
                        }
                        return undefined
                      },
                    }}
                  >
                    {(field) => (
                      <>
                        <Label htmlFor={field.name}>Email</Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="email"
                          placeholder="m@example.com"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {!field.state.meta.isValid &&
                        field.state.meta.errors.length > 0 ? (
                          <p className="text-destructive text-xs" role="alert">
                            {String(field.state.meta.errors[0])}
                          </p>
                        ) : null}
                      </>
                    )}
                  </form.Field>
                </div>

                <div className="grid gap-2">
                  <form.Field
                    name="password"
                    validators={{
                      onChange: ({ value }) => {
                        if (!value || value.length < 8) {
                          return "Password must be at least 8 characters"
                        }
                        if (!/[A-Z]/.test(value)) {
                          return "Password must contain at least one uppercase letter"
                        }
                        if (!/[a-z]/.test(value)) {
                          return "Password must contain at least one lowercase letter"
                        }
                        if (!/[0-9]/.test(value)) {
                          return "Password must contain at least one number"
                        }
                        return undefined
                      },
                    }}
                  >
                    {(field) => (
                      <>
                        <Label htmlFor={field.name}>Password</Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="password"
                          placeholder="********"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {!field.state.meta.isValid &&
                        field.state.meta.errors.length > 0 ? (
                          <p className="text-destructive text-xs" role="alert">
                            {String(field.state.meta.errors[0])}
                          </p>
                        ) : null}
                      </>
                    )}
                  </form.Field>
                </div>

                <div className="grid gap-2">
                  <form.Field
                    name="confirmPassword"
                    validators={{
                      onChange: ({ value, fieldApi }) => {
                        const password = fieldApi.form.getFieldValue("password")
                        if (value && password && value !== password) {
                          return "Passwords do not match"
                        }
                        return undefined
                      },
                    }}
                  >
                    {(field) => (
                      <>
                        <Label htmlFor={field.name}>Confirm Password</Label>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="password"
                          placeholder="********"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {!field.state.meta.isValid &&
                        field.state.meta.errors.length > 0 ? (
                          <p className="text-destructive text-xs" role="alert">
                            {String(field.state.meta.errors[0])}
                          </p>
                        ) : null}
                      </>
                    )}
                  </form.Field>
                </div>

                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                  {([canSubmit, isSubmitting]) => (
                    <Button type="submit" disabled={!canSubmit || isSubmitting}>
                      {isSubmitting ? "Creating account..." : "Create Account"}
                    </Button>
                  )}
                </form.Subscribe>
              </div>
            </div>
          </form>
          <div className="text-muted-foreground text-center text-xs text-balance">
            By clicking create account, you agree to our{" "}
            <a
              href="#"
              className="hover:text-primary underline underline-offset-4"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="hover:text-primary underline underline-offset-4"
            >
              Privacy Policy
            </a>
            .
          </div>
        </Card>
      </div>
    </div>
  )
}
