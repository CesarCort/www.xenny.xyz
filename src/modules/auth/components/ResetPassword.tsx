import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthApi } from "../hooks/useAuthApi";
import { toast } from "react-hot-toast";
import { ResetPasswordFormInputs } from "./ResetPassword.types";
import { PasswordResetData } from "@/core/types/auth.types";

export const ResetPassword = () => {
  const { token } = useParams(); // Obtenemos el token de la URL
  const { resetPassword, isSubmitting } = useAuthApi();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>({
    defaultValues: {
      token: token || "", // Asignamos el token del URL
    },
  });

  const onSubmit = async (data: ResetPasswordFormInputs) => {
    try {
      // Extraemos solo los datos necesarios para el reset
      const resetData: PasswordResetData = {
        token: data.token,
        newPassword: data.newPassword,
      };

      await resetPassword(resetData);
      toast.success("Contraseña actualizada exitosamente");
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          error.message ||
          "No se pudo actualizar la contraseña. Por favor, intente nuevamente."
        );
      }
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
                Establecer nueva contraseña
              </h2>
              <p className="mt-2 text-sm/6 text-gray-500">
                Por favor, ingresa tu nueva contraseña
              </p>
            </div>

            <div className="mt-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Nueva contraseña
                  </label>
                  <div className="mt-2">
                    <input
                      id="newPassword"
                      {...register("newPassword", {
                        required: "La contraseña es requerida",
                        minLength: {
                          value: 8,
                          message:
                            "La contraseña debe tener al menos 8 caracteres",
                        },
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message:
                            "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial",
                        },
                      })}
                      type="password"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                    {errors.newPassword && (
                      <p className="mt-1 text-sm text-red-600" role="alert">
                        {errors.newPassword.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Confirmar contraseña
                  </label>
                  <div className="mt-2">
                    <input
                      id="confirmPassword"
                      {...register("confirmPassword", {
                        required: "Por favor confirma tu contraseña",
                        validate: (value) =>
                          value === watch("newPassword") ||
                          "Las contraseñas no coinciden",
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

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
                  >
                    {isSubmitting
                      ? "Actualizando contraseña..."
                      : "Actualizar contraseña"}
                  </button>
                </div>

                <div className="text-center">
                  <Link
                    to="/login"
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Volver al inicio de sesión
                  </Link>
                </div>
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
