import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuthApi } from "../hooks/useAuthApi";
import { toast } from "react-hot-toast";
import { RequestPasswordRecoveryFormInputs } from "./RequestPasswordRecovery.types";

export const RequestPasswordRecovery = () => {
  const { requestPasswordRecovery, isSubmitting } = useAuthApi();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestPasswordRecoveryFormInputs>({
    mode: "onBlur",
  });

  const onSubmit = async (data: RequestPasswordRecoveryFormInputs) => {
    try {
      await requestPasswordRecovery(data);
      toast.success(
        "Si el correo existe, recibirás instrucciones para recuperar tu contraseña"
      );
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          "No se pudo procesar la solicitud. Por favor, intente nuevamente."
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
                Recuperar contraseña
              </h2>
              <p className="mt-2 text-sm/6 text-gray-500">
                Ingresa tu correo electrónico y te enviaremos instrucciones para
                recuperar tu contraseña
              </p>
            </div>

            <div className="mt-10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Correo electrónico
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      {...register("email", {
                        required: "El correo electrónico es requerido",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Correo electrónico inválido",
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
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
                  >
                    {isSubmitting
                      ? "Enviando instrucciones..."
                      : "Enviar instrucciones"}
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
