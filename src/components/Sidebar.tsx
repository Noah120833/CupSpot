import '../App.css'
import { useEffect, useState } from 'react'
import supabase from '../supabase'
import type { Cafe } from '../types'

type SidebarProps = {
  cafes: Cafe[]
  selectedCafe: Cafe | null

}

type RatingState = {
  wifi: number
  noise: number
  outlets: number
  crowdedness: number
  comment: string
}

function StarRating({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) {
  return (
    <div className='star-row'>
      <p className='star-label'>{label}</p>
      <div className='stars'>
        {[1,2,3,4,5].map(star => (
          <span key={star} className={`star ${value >= star ? 'filled' : ''}`} onClick={() => onChange(star)}>★</span>
        ))}
      </div>
    </div>
  )
}

function Sidebar({ cafes, selectedCafe }: SidebarProps) {
  const [cafeToRate, setCafeToRate] = useState<Cafe | null>(null)
  const [newRatings, setNewRatings] = useState<{ wifi: number, noise: number, outlets: number, crowdedness: number } | null>(null)
  const [rating, setRating] = useState<RatingState>({ wifi: 0, noise: 0, outlets: 0, crowdedness: 0, comment: '' })

  const handleSubmit = async () => {
    const ratings = await supabase.from('ratings').insert({ cafe_id: cafeToRate?.id, wifi: rating.wifi, noise: rating.noise, outlets: rating.outlets, crowdedness: rating.crowdedness, comment: rating.comment })
    console.log(ratings)
    setCafeToRate(null)
    setRating({ wifi: 0, noise: 0, outlets: 0, crowdedness: 0, comment: '' })
  }

  useEffect(() => {
    const fetchRatings = async () => {
      if (!selectedCafe) return
      const avgratings = await supabase.from('ratings').select('*').eq('cafe_id', selectedCafe.id)
      setNewRatings(avgratings.data?.[0])
    }
    fetchRatings()
  }, [selectedCafe])

  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
  <img src='/logo.png' className='sidebar-logo' alt='CupSpot' />
  <div className='sidebar-header-text'>
    <p className='sidebar-title'>CupSpot</p>
    <p className='sidebar-subtitle'>Find your perfect work café</p>
  </div>
</div>

      {selectedCafe ? (
        <div className='cafe-card'>
          {selectedCafe.image_url && <img src={selectedCafe.image_url} className='cafe-img' />}
          <h3>{selectedCafe.name}</h3>
          <p>{selectedCafe.address}</p>

          {newRatings ? (
            <div className='avg-ratings'>
              <StarRating label='WiFi' value={Math.round(newRatings.wifi)} onChange={() => {}} />
              <StarRating label='Noise' value={Math.round(newRatings.noise)} onChange={() => {}} />
              <StarRating label='Outlets' value={Math.round(newRatings.outlets)} onChange={() => {}} />
              <StarRating label='Crowdedness' value={Math.round(newRatings.crowdedness)} onChange={() => {}} />
            </div>
          ) :
          (<button type="button" className='rate-btn' onClick={() => setCafeToRate(selectedCafe)}>Rate this café</button>)
        }
        </div>
      ) : (
        <>
          <p className='sidebar-subtitle'>Nearby cafés</p>
          {cafes.map(cafe => (
            <div key={cafe.id} className='cafe-card'>
              {cafe.image_url && <img src={cafe.image_url} className='cafe-img' />}
              <h3>{cafe.name}</h3>
              <p>{cafe.address}</p>
              <button type="button" className='rate-btn' onClick={() => setCafeToRate(cafe)}>Rate this café</button>
            </div>
          ))}
        </>
      )}

      {cafeToRate && (
        <div className='modal-overlay'>
          <div className='modal'>
            <h3>Rate {cafeToRate.name}</h3>
            <StarRating label='WiFi' value={rating.wifi} onChange={v => setRating({...rating, wifi: v})} />
            <StarRating label='Noise' value={rating.noise} onChange={v => setRating({...rating, noise: v})} />
            <StarRating label='Outlets' value={rating.outlets} onChange={v => setRating({...rating, outlets: v})} />
            <StarRating label='Crowdedness' value={rating.crowdedness} onChange={v => setRating({...rating, crowdedness: v})} />
            <textarea className='comment-input' placeholder='Optional comment...' value={rating.comment} onChange={e => setRating({...rating, comment: e.target.value})} />
            <div className='modal-actions'>
              <button className='cancel-btn' onClick={() => setCafeToRate(null)}>Cancel</button>
              <button className='submit-btn' onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sidebar