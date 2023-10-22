import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import useFetchPoolTables from '../../Hooks/useFetchPoolTables';
import 'leaflet/dist/leaflet.css';
import './map.css';

function Map() {
	const { poolTables, loading } = useFetchPoolTables();

	const mapBoxSkinKey = import.meta.env.VITE_MAPBOX_SKIN_KEY;

	return (
		<div className='py-5'>
			<MapContainer
				center={[45.5152, -122.6784]}
				zoom={14}
				className='mycssmap'
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url={mapBoxSkinKey}
					// url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				{poolTables.map((pT) => (
					<Marker key={pT.id} position={[pT.lat, pT.lng]}></Marker>
				))}
			</MapContainer>
		</div>
	);
}

export default Map;
