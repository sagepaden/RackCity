import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import '../../App.css';
import 'leaflet/dist/leaflet.css';

function LeafLetTest() {
	return (
		<div>
			<div className='py-5 '>
				<MapContainer
					center={[48.8566, 2.3522]}
					zoom={13}
					className='flex  h-[170px] md:h-[320px] w-full object-cover rounded-xl'
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					/>
				</MapContainer>
			</div>
		</div>
	);
}

export default LeafLetTest;
