import React, { useCallback, useState } from "react";
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
import { FaFaceSmile, FaLocationDot, FaBuilding } from "react-icons/fa6";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";

export default function ProfRegister() {

  const navigate = useNavigate();

  const [officeAddresses, setOfficeAddresses] = useState([]);
  const [officePhotos, setOfficePhotos] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    nombre: "",
    apellido: "",
    sexo: "",
    birthDate: "",
    password: "",
    repeatPassword: "",
    rol: "prof",
    profesion: "",
    estado: "",
    ubicacionExacta: false,
    descripcion: "",
  });

  const estadosVenezuela = [
    { value: "Distrito Capital", label: "Distrito Capital" },
    { value: "Amazonas", label: "Amazonas" },
    { value: "Anzoátegui", label: "Anzoátegui" },
    { value: "Apure", label: "Apure" },
    { value: "Aragua", label: "Aragua" },
    { value: "Barinas", label: "Barinas" },
    { value: "Bolívar", label: "Bolívar" },
    { value: "Carabobo", label: "Carabobo" },
    { value: "Cojedes", label: "Cojedes" },
    { value: "Delta Amacuro", label: "Delta Amacuro" },
    { value: "Falcón", label: "Falcón" },
    { value: "Guárico", label: "Guárico" },
    { value: "Lara", label: "Lara" },
    { value: "Mérida", label: "Mérida" },
    { value: "Miranda", label: "Miranda" },
    { value: "Monagas", label: "Monagas" },
    { value: "Nueva Esparta", label: "Nueva Esparta" },
    { value: "Portuguesa", label: "Portuguesa" },
    { value: "Sucre", label: "Sucre" },
    { value: "Táchira", label: "Táchira" },
    { value: "Trujillo", label: "Trujillo" },
    { value: "Vargas", label: "Vargas" },
    { value: "Yaracuy", label: "Yaracuy" },
    { value: "Zulia", label: "Zulia" },
    { value: "Dependencias Federales", label: "Dependencias Federales" },
  ];

  const profesionesMedicas = [
    { value: "Medico General", label: "Médico General" },
    { value: "Cardiologo", label: "Cardiólogo" },
    { value: "Dermatologo", label: "Dermatólogo" },
    { value: "Endocrinologo", label: "Endocrinólogo" },
    { value: "Gastroenterologo", label: "Gastroenterólogo" },
    { value: "Ginecologo", label: "Ginecólogo" },
    { value: "Hematologo", label: "Hematólogo" },
    { value: "Infectologo", label: "Infectólogo" },
    { value: "Nefrologo", label: "Nefrólogo" },
    { value: "Neumologo", label: "Neumólogo" },
    { value: "Neurologo", label: "Neurólogo" },
    { value: "Oftalmologo", label: "Oftalmólogo" },
    { value: "Oncologo", label: "Oncólogo" },
    { value: "Otorrinolaringologo", label: "Otorrinolaringólogo" },
    { value: "Pediatra", label: "Pediatra" },
    { value: "Psiquiatra", label: "Psiquiatra" },
    { value: "Reumatólogo", label: "Reumatólogo" },
    { value: "Traumatólogo", label: "Traumatólogo" },
    { value: "Urologo", label: "Urólogo" },
    { value: "Odontologo", label: "Odontólogo" },
    { value: "Cirujano General", label: "Cirujano General" },
    { value: "Cirujano Plastico", label: "Cirujano Plástico" },
    { value: "Cirujano Cardiovascular", label: "Cirujano Cardiovascular" },
    { value: "Cirujano Maxilofacial", label: "Cirujano Maxilofacial" },
    { value: "Cirujano Pediatrico", label: "Cirujano Pediátrico" },
    { value: "Anestesiólogo", label: "Anestesiólogo" },
    { value: "Radiologo", label: "Radiólogo" },
    { value: "Nutricionista", label: "Nutricionista" },
    { value: "Fisiatra", label: "Fisiatra" },
    { value: "Geriatra", label: "Geriatra" },
    { value: "Hemato-Oncologo", label: "Hemato-Oncólogo" },
    { value: "Medico Deportivo", label: "Médico Deportivo" },
    { value: "Medico del Trabajo", label: "Médico del Trabajo" },
    { value: "Medico Estetico", label: "Médico Estético" },
    { value: "Medico Familiar", label: "Médico Familiar" },
    { value: "Medico Forense", label: "Médico Forense" },
    { value: "Medico Internista", label: "Médico Internista" },
    { value: "Psicologo Clinico", label: "Psicólogo Clínico" },
    { value: "Neurocirujano", label: "Neurocirujano" },
    { value: "Proctologo", label: "Proctólogo" },
    { value: "Foniatra", label: "Foniatra" },
    { value: "Genetista", label: "Genetista" },
    { value: "Inmunologo", label: "Inmunólogo" },
    { value: "Medico Intensivista", label: "Médico Intensivista" },
    { value: "Neuroradiologo", label: "Neurorradiólogo" },
    { value: "Patologo", label: "Patólogo" },
  ];

  /**
   * Valida los campos del formulario y establece los mensajes de error correspondientes.
   */
  const validate = () => {
    let tempErrors = {};
    tempErrors.username = formData.username
      ? ""
      : "El nombre de usuario es requerido.";
    tempErrors.email = formData.email ? "" : "El email es requerido.";
    tempErrors.nombre = formData.nombre ? "" : "El nombre es requerido.";
    tempErrors.apellido = formData.apellido ? "" : "El apellido es requerido.";
    tempErrors.sexo = formData.sexo ? "" : "El sexo es requerido.";
    tempErrors.birthDate = formData.birthDate
      ? ""
      : "La fecha de nacimiento es requerida.";
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
    // Validar que haya al menos una dirección de oficina si ubicacionExacta es true
    if (formData.ubicacionExacta && officeAddresses.length === 0) {
      tempErrors.officeAddresses =
        "Debes agregar al menos una dirección de oficina si marcas 'Dar ubicación exacta'.";
    }
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  /**
   * Maneja el cambio de la foto de perfil.
   */
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file || null);
  };

  /**
   * Maneja la selección de múltiples archivos para las fotos de la oficina.
   */
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map((file) => ({
      id: `${file.name}-${Date.now()}`,
      file: file,
    }));
    setOfficePhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  /**
   * Elimina una foto de la oficina por su ID.
   */
  const handleRemovePhoto = (id) => {
    setOfficePhotos((prevPhotos) =>
      prevPhotos.filter((photo) => photo.id !== id)
    );
  };

  /**
   * Maneja el cambio de los campos de entrada del formulario.
   */
  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  /**
   * Callback para actualizar las direcciones de oficina desde el componente MapComponent.
   */
  const addOfficeAddress = useCallback((newAddresses) => {
    console.log("=== ANTES DE ACTUALIZAR ===");
    console.log("Nuevas direcciones recibidas:", newAddresses);
    console.log("Direcciones actuales:", officeAddresses);

    if (newAddresses.length > 3) {
      alert("Solo se permiten 3 oficinas máximo.");
      return;
    }

    // ✅ Usar función para acceder al estado actual
    setOfficeAddresses((prevAddresses) => {
      console.log("=== DENTRO DEL SETTER ===");
      console.log("Estado anterior real:", prevAddresses);
      console.log("Nuevo estado:", newAddresses);
      return newAddresses;
    });

   
  }, []); // Mantener sin dependencias

  const handleRemoveAddress = (index) => {
    const updatedAddresses = [...officeAddresses];
    updatedAddresses.splice(index, 1);
    setOfficeAddresses(updatedAddresses);
  };

  /**
   * Maneja el envío del formulario de registro.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
      if (profilePicture) {
        data.append("profilePicture", profilePicture);
      }
      officePhotos.forEach((photo) => {
        data.append("officePhotos", photo.file);
      });
      data.append("officeAddresses", JSON.stringify(officeAddresses));

      try {
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
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col py-5 bg-blue-400 gap-3 text-white text-center">
        <h1 className="text-3xl font-bold">Registro de Profesional</h1>
        <p className="text-lg font-semibold max-w-2xl mx-auto">
          Llena el formulario con tu información de perfil
        </p>
      </div>
      <div className="flex flex-col items-center justify-center pt-5">
        <form
          className="w-full lg:max-w-2xl max-w-md p-8 m-4 space-y-6"
          onSubmit={handleSubmit}
        >
          {/* Sección de foto de perfil */}
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
            {/* Sección de información básica */}
            <div className="flex flex-col gap-3">
              <div>
                {/* Campo para el nombre de usuario */}
                <Label htmlFor="username">Nombre de usuario</Label>
                <Input
                  icon={"FaUserAlt"}
                  id="username"
                  type="text"
                  placeholder="tunombredeusuario"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>
              {/* Campo para el correo electrónico */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  icon={"MdEmail"}
                  id="email"
                  type="text"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                {/* Campo para el nombre */}
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
                {/* Campo para el apellido */}
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
                  <p className="text-red-500 text-sm mt-1">{errors.apellido}</p>
                )}
              </div>
            </div>
          </div>
          {/* Campo para seleccionar el sexo */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-6 lg:mb-6">
            <div className="gap-3">
              <div>
                <Label htmlFor="sexo">Selecciona un sexo</Label>
                <SelectInput
                  icon={"ImManWoman"}
                  id="sexo"
                  value={formData.sexo}
                  onChange={handleInputChange}
                  options={[
                    { value: "Masculino", label: "Masculino" },
                    { value: "Femenino", label: "Femenino" },
                    { value: "Intersexo", label: "Intersexo" },
                    { value: "Hombre Trans", label: "Hombre Trans" },
                    { value: "Mujer Trans", label: "Mujer Trans" },
                  ]}
                  placeholder="Selecciona un sexo"
                />
              </div>
              {errors.sexo && (
                <p className="text-red-500 text-sm mt-1">{errors.sexo}</p>
              )}
            </div>
          </div>
          {/* Campo para la fecha de nacimiento */}
          <div>
            <Label htmlFor="birthDate">Fecha de nacimiento</Label>
            <Input
              icon={"MdDateRange"}
              id="birthDate"
              type="date"
              placeholder="1991-01-01"
              value={formData.birthDate}
              onChange={handleInputChange}
            />
            {errors.birthDate && (
              <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>
            )}
          </div>
          {/* Sección de contraseña y profesión */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-6 lg:mb-6">
            <div className="flex flex-col gap-3">
              <div>
                {/* Campo para la contraseña */}
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
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <div>
                {/* Campo para repetir la contraseña */}
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
                {/* Campo para seleccionar la profesión */}
                <Label htmlFor="profesion">Selecciona una profesión</Label>
                <SelectInput
                  icon={"FaSuitcase"}
                  id="profesion"
                  value={formData.profesion}
                  onChange={handleInputChange}
                  options={profesionesMedicas}
                  placeholder="Selecciona una Profesión"
                />
              </div>
              {errors.profesion && (
                <p className="text-red-500 text-sm mt-1">{errors.profesion}</p>
              )}
            </div>
          </div>
          {/* Sección de estado y ubicación */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-6 lg:mb-6">
            <div className="gap-3">
              <div>
                {/* Campo para seleccionar el estado */}
                <Label htmlFor="estado">Selecciona un estado</Label>
                <SelectInput
                  icon={"FaLocationDot"}
                  id="estado"
                  value={formData.estado}
                  onChange={handleInputChange}
                  options={estadosVenezuela}
                  placeholder="Selecciona un estado"
                />
              </div>
              {errors.estado && (
                <p className="text-red-500 text-sm mt-1">{errors.estado}</p>
              )}
              <div className="mt-4">
                {/* Checkbox para dar ubicación exacta */}
                <Checkbox
                  label="Dar ubicación exacta"
                  id="ubicacionExacta"
                  checked={formData.ubicacionExacta}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          {/* Sección del mapa */}
          <div>
            {/* Componente de mapa para agregar direcciones de oficina */}
            <Label htmlFor="oficina">Dirección de tus oficinas. Máximo 3</Label>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <MapComponent
                addresses={officeAddresses}
                onAddressesChange={addOfficeAddress}
                interactive={true}
              />
              {errors.officeAddresses && (
                <p className="text-red-500 text-xs italic">
                  {errors.officeAddresses}
                </p>
              )}
            </div>
            <div className="mt-2 bg-white p-4 rounded-lg shadow-md">
              {/* Muestra las oficinas guardadas */}
              <h2 className="text-lg font-semibold mb-2">
                Oficinas Guardadas:
              </h2>
              {officeAddresses.length > 0 ? (
                <div className="space-y-2">
                  {officeAddresses.map((address, index) => (
                    <div
                      key={index}
                      className="p-3 border rounded-lg bg-gray-50 flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">Oficina {index + 1}:</p>
                        <p>Latitud: {address.lat.toFixed(6)}</p>
                        <p>Longitud: {address.lng.toFixed(6)}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveAddress(index)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm transition-colors duration-200"
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No hay oficinas guardadas.</p>
              )}
            </div>
          </div>
          {/* Sección de fotos de oficina */}
          <div>
            {/* Botón para subir fotos de la oficina */}
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
              type="file"
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
            {/* Muestra las fotos de la oficina subidas */}
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
          {/* Sección de descripción */}
          <div>
            {/* Campo de área de texto para la descripción del profesional */}
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
            />
          </div>
          {/* Botón de envío */}
          {/* Botón para enviar el formulario de registro */}
          <Button className="w-full" type="submit">
            Registrarse
          </Button>
          <div className="text-center">
            <Link href={"/login"}>¿Ya tienes cuenta? Inicia Sesión</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
