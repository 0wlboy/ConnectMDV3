import {
  Input,
  Label,
  Checkbox,
  Button,
  Link,
} from "../components/ui/exporter.js";

const Login = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {/* Contenedor del formulario con estilos mejorados */}
        <form className="w-full max-w-md p-8 m-4 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Iniciar Sesión
          </h2>
          <div>
            <Label htmlFor="username">
              Nombre de usuario
            </Label>
            <Input
              icon={"FaUserAlt"}
              id="username"
              type="text"
              placeholder="tunombredeusuario"
            />
          </div>
          <div>
            <Label htmlFor="password">
              Contraseña
            </Label>
            <Input
              icon={"FaLock"}
              id="password"
              type="password"
              placeholder="••••••••"
            />
          </div>
          <Checkbox label={"Recuérdame"} />
          <Button className="w-full">Iniciar Sesión</Button>
          <div className="text-center">
            <Link>¿Olvidaste tu contraseña?</Link>
          </div>
          <div className="text-center">
            <Link href={"/RolPicker"}>¿No tienes cuenta? Registrate</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
