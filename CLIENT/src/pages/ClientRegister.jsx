import React, { useState } from "react";
import {
  Input,
  Label,
  Checkbox,
  Button,
  Link,
  SelectInput,
  Textarea,
} from "../components/ui/exporter.js";

import { FaFaceSmile} from "react-icons/fa6";

const ClientRegister = () => {
  const [profilePicture, setProfilePicture] = useState(null);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
    } else {
      setProfilePicture(null);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="flex flex-col py-5 bg-blue-400 gap-3 text-white text-center">
          <h1 className="text-3xl font-bold">Registro de Cliente</h1>
          <p className="text-lg font-semibold max-w-2xl mx-auto">
            Llena el formulario con tu información de perfil
          </p>
        </div>
        <div className="flex flex-col items-center justify-center pt-5">
        <form
          className="w-full lg:max-w-2xl max-w-md p-8 m-4 space-y-6"
          action="submit"
        >
          <div className="lg:grid lg:grid-cols-2 lg:gap-6 lg:mb-6">
            <div className="mb-6 lg:mb-0">
              <div className="relative w-48 h-48 mx-auto overflow-hidden bg-gray-100 rounded-lg flex items-center justify-center border-2 border-gray-300 border-dashed">
                <label
                  htmlFor="profile-picture"
                  className="flex flex-col items-center justify-center w-full h-full cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <input
                    id="profile-picture"
                    type="file"
                    className="hidden"
                    onChange={handleProfilePictureChange}
                  />
                  {profilePicture ? (
                    <img
                      src={profilePicture}
                      alt="Profile Picture"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <FaFaceSmile className="h-10 w-10 text-gray-500" />
                    </div>
                  )}
                </label>
              </div>
              <div className="text-center text-gray-500 mt-2">
                <p>Carga una foto de perfil</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <Label htmlFor="username">Nombre de usuario</Label>
                <div>
                  <Input
                    icon={"FaUserAlt"}
                    id="username"
                    type="text"
                    placeholder="tunombredeusuario"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  icon={"FaAddressCard"}
                  id="nombre"
                  type="text"
                  placeholder="Tu primer nombre"
                />
              </div>
              <div>
                <Label htmlFor="apellido">Apellido</Label>
                <Input
                  icon={"FaAddressCard"}
                  id="apellido"
                  type="text"
                  placeholder="tu apellido"
                />
              </div>
            </div>
          </div>
          <div className="lg:grid lg:grid-cols-2 lg:gap-6 lg:mb-6">
            <div className="flex flex-col gap-3">
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  icon={"FaLock"}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <Label htmlFor="repeatPassword">Repetir contraseña</Label>
                <Input
                  icon={"FaLock"}
                  id="repeatPassword"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div className="gap-3">
              <div>
                <Label htmlFor="estado">Selecciona un estado</Label>
                <SelectInput
                  icon={"FaLocationDot"}
                  id="estado"
                  options={[
                    { value: "estado1", label: "Estado 1" },
                    { value: "estado2", label: "Estado 2" },
                    { value: "estado3", label: "Estado 3" },
                  ]}
                  placeholder="Selecciona un estado"
                />
              </div>
              <div className="mt-4">
                <Checkbox label="Dar ubicación exacta" onChange={() => {}} />
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea id="descripcion"></Textarea>
          </div>
          <Button className="w-full">Registrarse</Button>
          <div className="text-center">
            <Link href={"/login"}>¿Ya tienes cuenta? Inicia Sesión</Link>
          </div>
        </form>
      </div>
      </div>
    </>
  );
};

export default ClientRegister;
