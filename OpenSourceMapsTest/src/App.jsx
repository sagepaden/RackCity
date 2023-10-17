import "./App.css";
import Layers from "./Components/layers/Layers";
import { OlTileLayer } from "./Components/layers/OlTileLayer";
import { ReMap } from "./Map/map/ReMap";
import { WMSTile } from "./Components/WMSTile";

function App() {
  return (
    <div className='App'>
      <ReMap center={[0, 0]} zoom={12}>
        <Layers>
          <OlTileLayer
            source={WMSTile("https://ahocevar.com/geoserver/wms", {
              LAYERS: "topp:states",
              Tiled: true,
            })}
          />
        </Layers>
      </ReMap>
    </div>
  );
}

export default App;