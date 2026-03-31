import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuthApi } from "../hooks/useAuthApi";
import { RegisterData } from "@/core/types/auth.types";
import { toast } from "react-hot-toast";
import { RegisterFormInputs } from "./RegisterForm.types";

export const RegisterForm = () => {
  const { register: registerUser, isSubmitting } = useAuthApi();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit = async (formData: RegisterFormInputs) => {
    try {
      const registerData: RegisterData = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      };

      await registerUser(registerData);
      toast.success("¡Cuenta creada exitosamente!");
      navigate("/dashboard");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Error al crear la cuenta. Por favor, intente nuevamente.";
      toast.error(message);
    }
  };

  return (
    <section className="h-screen w-full bg-gray-50">
      <div className="flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-10 w-auto"
              />
              <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">
                Create your account
              </h2>
              <p className="mt-2 text-sm/6 text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <div className="mt-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        id="firstName"
                        {...register("firstName", {
                          required: "First name is required",
                          minLength: {
                            value: 2,
                            message: "First name must be at least 2 characters",
                          },
                        })}
                        type="text"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600" role="alert">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                        id="lastName"
                        {...register("lastName", {
                          required: "Last name is required",
                          minLength: {
                            value: 2,
                            message: "Last name must be at least 2 characters",
                          },
                        })}
                        type="text"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600" role="alert">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      type="email"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message:
                            "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
                        },
                      })}
                      type="password"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600" role="alert">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Confirm password
                  </label>
                  <div className="mt-2">
                    <input
                      id="confirmPassword"
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === watch("password") ||
                          "Passwords do not match",
                      })}
                      type="password"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600" role="alert">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    {...register("terms", {
                      required: "You must accept the terms and conditions",
                    })}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    I agree to the{" "}
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                  {errors.terms && (
                    <p className="mt-1 text-sm text-red-600" role="alert">
                      {errors.terms.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
                >
                  {isSubmitting ? "Creating account..." : "Create account"}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
