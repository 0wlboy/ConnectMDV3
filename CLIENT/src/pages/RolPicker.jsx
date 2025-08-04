import { Button, Link } from "../components/ui/exporter.js";
import { useNavigate } from "react-router-dom";
import imgClient from "../assets/Img/stock/clientImg.jpg";
import imgProf from "../assets/Img/stock/profImg.jpg";
import {FaUserAlt, FaBriefcase} from "react-icons/fa";



const RolPicker = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-gray-100">
        <div className=" flex flex-col py-5 bg-blue-400 gap-3 text-white text-center">
          <h1 className="text-3xl font-bold">ESCOGE UN ROL</h1>
          <p className="text-lg font-semibold max-w-2xl mx-auto">
            ¿Eres un cliente o un profesional? Selecciona el rol que mejor se
            adapte a tus necesidades para continuar con el registro.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center pt-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:justify-between lg:mt-10 items-center justify-center">
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm m-4">
              <img
                className="rounded-t-lg object-cover h-48 w-full"
                src={imgClient}
                alt="Imagen Cliente"
              />

              <div className="p-5">
                <div className="flex items-center gap-5 mb-3">
                  <div className="bg-blue-100 p-3  rounded-full inline-flex items-center justify-center mb-3">
                    <FaUserAlt className="w-8 h-8 text-blue-950" />
                  </div>
                  <h5 className="mb-2 text-3xl font-bold tracking-tight text-blue-950  ">
                    Cliente
                  </h5>
                </div>

                <p className="mb-3 h-28 font-normal text-blue-950 ">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
                <div className="mt-8">
                  {/* Replace '/client-registration' with your desired path */}
                  <Button
                    className="w-full"
                    onClick={() => navigate("/ClientRegister")}
                  >
                    Continua
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm m-4">
              <img
                className="rounded-t-lg object-cover h-48 w-full"
                src={imgProf}
                alt="Imagen Profesional"
              />

              <div className="p-5">
                <div className="flex items-center gap-5 mb-3">
                  <div className="bg-blue-100 p-3  rounded-full inline-flex items-center justify-center mb-3">
                    <FaBriefcase className="w-8 h-8 text-blue-950" />
                  </div>
                  <h5 className="mb-2 text-3xl font-bold tracking-tight text-blue-950  ">
                    Profesional
                  </h5>
                </div>
                <p className="mb-3 h-28 font-normal text-blue-950 ">
                  Accede a los servicios completos para profesionales: Configura
                  un perfil, subir ubicacion y imagenes de tus oficinas,
                  administrar citas, obten informacion precisa de tu desempeño
                  en la pagina
                </p>
                <div className="mt-8">
                  {/* Replace '/professional-registration' with your desired path */}
                  <Button
                    className="w-full"
                    onClick={() => navigate("/ProfRegister")}
                  >
                    Continua
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-center py-4">
            <Link styles="text-md" href={"/Login"}>¿Tienes cuenta? Inicia Sesion</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RolPicker;
