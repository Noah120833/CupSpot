import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import '../App.css'
import type { Cafe } from '../types'


type MapProps = {
  cafes: Cafe[]
  onSelectCafe: (cafe: Cafe) => void
}

function Map({cafes, onSelectCafe}: MapProps) {


  return (
    <div>
        <MapContainer center={[52.52, 13.405]} zoom={13} className='map' >
          <TileLayer url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'} />
          { cafes.map(cafe => (
            <Marker eventHandlers={{click: () => onSelectCafe(cafe)}} key={cafe.id} position={[cafe.lat, cafe.lng] }/>
          ))}
        </MapContainer>
    </div>
  )
}

export default Map



