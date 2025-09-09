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
import { Modal, MapComponent } from "../components/tools/exporter.js";
import { useNavigate } from "react-router-dom";
import {
  FaFaceSmile,
  FaLocationDot,
  FaBuilding,
  FaLessThanEqual,
} from "react-icons/fa6";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";

export default function ProfRegister() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [officeAddresses, setOfficeAddresses] = useState([]);
  const [currentOfficeAddress, setCurrentOfficeAddress] = useState("");
  const [officePhotos, setOfficePhotos] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null); // Almacenará el objeto File
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    nombre: "",
    apellido: "",
    password: "",
    repeatPassword: "",
    rol: "prof", // Asegúrate que coincida con el backend
    profesion: "",
    estado: "",
    ubicacionExacta: false,
    descripcion: "",
  });

  const actionModal = () => {
    console.log("Toggling modal state. Current state:", isModalOpen);
    setIsModalOpen(!isModalOpen);
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.username = formData.username
      ? ""
      : "El nombre de usuario es requerido.";
    tempErrors.nombre = formData.nombre ? "" : "El nombre es requerido.";
    tempErrors.apellido = formData.apellido ? "" : "El apellido es requerido.";
    tempErrors.password =
      formData.password.length >= 6
        ? ""
        : "La contraseña debe tener al menos 6 caracteres.";
    tempErrors.repeatPassword =
      formData.password === formData.repeatPassword
        ? ""
        : "Las contraseñas no coinciden.";
    tempErrors.profesion = formData.profesion
      ? ""
      : "La profesión es requerida.";
    tempErrors.estado = formData.estado ? "" : "El estado es requerido.";
    tempErrors.profilePicture = profilePicture
      ? ""
      : "La foto de perfil es requerida.";
    tempErrors.officePhotos =
      officePhotos.length > 0
        ? ""
        : "Al menos una foto de la oficina es requerida.";

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file || null);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map((file) => ({
      id: `${file.name}-${Date.now()}`,
      file: file,
    }));
    setOfficePhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleRemovePhoto = (id) => {
    setOfficePhotos((prevPhotos) =>
      prevPhotos.filter((photo) => photo.id !== id)
    );
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const addOfficeAddress = () => {
    if (currentOfficeAddress.trim() !== "" && officeAddresses.length < 3) {
      setOfficeAddresses([...officeAddresses, currentOfficeAddress.trim()]);
      setCurrentOfficeAddress("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const data = new FormData();

      // Añadir campos de texto
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      // Añadir archivos
      if (profilePicture) {
        data.append("profilePicture", profilePicture);
      }
      officePhotos.forEach((photo) => {
        data.append("officePhotos", photo.file);
      });

      // Añadir arrays
      data.append("officeAddresses", JSON.stringify(officeAddresses));

      try {
        // El navegador establece el 'Content-Type' a 'multipart/form-data' automáticamente
        const response = await fetch(
          "http://localhost:3001/api/users/register",
          {
            method: "POST",
            body: data,
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          alert(
            `Error al registrar: ${errorData.message || "Error desconocido"}`
          );
        } else {
          alert("Usuario registrado exitosamente");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error en la solicitud de registro:", error);
        alert(
          "No se pudo conectar con el servidor. Inténtalo de nuevo más tarde."
        );
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="flex flex-col py-5 bg-blue-400 gap-3 text-white text-center">
          <h1 className="text-3xl font-bold">Registro de Profesional</h1>
          <p className="text-lg font-semibold max-w-2xl mx-auto">
            Llena el formulario con tu información de perfil
          </p>
        </div>
        <div className="flex flex-col items-center justify-center pt-5">
          <form
            className="w-full lg:max-w-2xl max-w-md p-8 m-4 space-y-6  "
            action="submit"
            onSubmit={handleSubmit}
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
                    {errors.profilePicture && (
                      <p className="text-red-500 text-xs italic">
                        {errors.profilePicture}
                      </p>
                    )}
                    {profilePicture ? (
                      <img
                        src={URL.createObjectURL(profilePicture)}
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
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                    {errors.username && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.username}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    icon={"FaAddressCard"}
                    id="nombre"
                    type="text"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Tu primer nombre"
                  />
                  {errors.nombre && (
                    <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="apellido">Apellido</Label>
                  <Input
                    icon={"FaAddressCard"}
                    id="apellido"
                    type="text"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    placeholder="tu apellido"
                  />
                  {errors.apellido && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.apellido}
                    </p>
                  )}
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
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="repeatPassword">Repetir contraseña</Label>
                  <Input
                    icon={"FaLock"}
                    id="repeatPassword"
                    type="password"
                    value={formData.repeatPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                  />
                  {errors.repeatPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.repeatPassword}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-6 lg:mb-0">
                <div>
                  <Label htmlFor="profesion">Selecciona una profesión</Label>
                  <SelectInput
                    icon={"FaSuitcase"}
                    id="profesion"
                    value={formData.profesion}
                    onChange={handleInputChange}
                    options={[
                      { value: "Odontologo", label: "Odontologo" },
                      { value: "Doctor", label: "Doctor" },
                      { value: "Psicologo", label: "Psicologo" },
                    ]}
                    placeholder="Selecciona una Profesión"
                  />
                </div>
                {errors.profesion && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.profesion}
                  </p>
                )}
              </div>
            </div>
            <div className="lg:grid lg:grid-cols-2 lg:gap-6 lg:mb-6">
              <div className="gap-3">
                <div>
                  <Label htmlFor="estado">Selecciona un estado</Label>
                  <SelectInput
                    icon={"FaLocationDot"}
                    id="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                    options={[
                      { value: "estado1", label: "Estado 1" },
                      { value: "estado2", label: "Estado 2" },
                      { value: "estado3", label: "Estado 3" },
                    ]}
                    placeholder="Selecciona un estado"
                  />
                </div>
                {errors.estado && (
                  <p className="text-red-500 text-sm mt-1">{errors.estado}</p>
                )}
                <div className="mt-4">
                  <Checkbox
                    label="Dar ubicación exacta"
                    id="ubicacionExacta"
                    checked={formData.ubicacionExacta}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="oficina">
                Dirección de tus oficinas. Máximo 3
              </Label>
              <div>
                <MapComponent
                  
                ></MapComponent>
              </div>
            </div>
            <div>
              <Label htmlFor="office-photos">Agregar fotos de oficina</Label>
              <Button
                className="relative flex items-center justify-center cursor-pointer py-1 px-3 text-sm"
                onClick={() => document.getElementById("office-photos").click()}
              >
                <FaPlusCircle className="h-4 w-4 mr-2" />
                Subir Fotos
              </Button>
              <input
                id="office-photos"
                type="file" // This input is hidden and triggered by the button
                className="hidden"
                onChange={handleFileChange}
                multiple
                accept="image/*"
              />
              {errors.officePhotos && (
                <p className="text-red-500 text-xs italic">
                  {errors.officePhotos}
                </p>
              )}
              <div className="flex space-x-2 my-4">
                {officePhotos.map((photo) => (
                  <div key={photo.id} className="relative w-20 h-20">
                    <img
                      src={URL.createObjectURL(photo.file)}
                      alt="Uploaded"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleRemovePhoto(photo.id)}
                      className="absolute inset-0 flex items-center justify-center bg-red-600 rounded-lg cursor-pointer bg-opacity-50 opacity-0 hover:opacity-90 transition-opacity"
                    >
                      <FaTrashAlt className="text-white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
              ></Textarea>
            </div>
            <Button className="w-full" type="submit">
              Registrarse
            </Button>
            <div className="text-center">
              <Link href={"/login"}>¿Ya tienes cuenta? Inicia Sesión</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
