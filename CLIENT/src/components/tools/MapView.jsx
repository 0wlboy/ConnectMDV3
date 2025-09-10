import MapComponent from "./MapComponent";

const MapView = ({ lat, lng, addresses, interactive = false }) => {
  return (
    <>
     <div className="flex gap-[20px] w-full h-96">
        <MapComponent lat={lat} lng={lng} addresses={addresses} interactive={interactive}/>
     </div>
    </>
    )
};

export default MapView;
