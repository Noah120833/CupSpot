import { MapContainer, TileLayer, Marker } from 'react-leaflet' 
import '../App.css'
import type { Cafe } from '../types'

import L from 'leaflet'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const defaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})

L.Marker.prototype.options.icon = defaultIcon

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



