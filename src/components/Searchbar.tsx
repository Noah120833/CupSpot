import '../App.css'
import { useState } from 'react'
import type { Cafe } from '../types'

type SearchbarProps = {
  cafes: Cafe[]
  onSelect: (cafe: Cafe) => void
}

function Searchbar({ cafes, onSelect }: SearchbarProps) {
  const [query, setQuery] = useState('')

  const suggestions = query.length > 0
    ? cafes.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
    : []

  const handleSelect = (cafe: Cafe) => {
    onSelect(cafe)
    setQuery('')
  }

  return (
    <div className='searchbar-wrapper'>
      <input
        className='searchbar'
        placeholder='Search cafés...'
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {suggestions.length > 0 && (
        <div className='suggestions'>
          {suggestions.map(cafe => (
            <div key={cafe.id} className='suggestion-item' onClick={() => handleSelect(cafe)}>
              {cafe.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Searchbar