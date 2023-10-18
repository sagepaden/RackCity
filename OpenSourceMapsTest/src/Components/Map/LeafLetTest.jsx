import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';

function LeafLetTest() {
	return (
		<div className='py-5'>
			<MapContainer
				center={[48.8566, 2.3522]}
				zoom={13}
				className='mycssmap'
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
			</MapContainer>
		</div>
	);
}

export default LeafLetTest;
