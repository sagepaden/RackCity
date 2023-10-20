import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import useFetchPoolTables from '../../Hooks/useFetchPoolTables';
import 'leaflet/dist/leaflet.css';
import './map.css';

function Map() {
	const { poolTableList, loading } = useFetchPoolTables();

	return (
		<div className='py-5'>
			<MapContainer
				center={[45.5152, -122.6784]}
				zoom={13}
				className='mycssmap'
			>
				{poolTableList.map((poolTable) => (
					<Marker
						key={poolTable.id}
						position={[poolTable.lat, poolTable.lng]}
					></Marker>
				))}
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
			</MapContainer>
		</div>
	);
}

export default Map;
