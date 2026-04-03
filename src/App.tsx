import './App.css'
import { useEffect, useState } from 'react'
import supabase from './supabase'
import Map from './components/Map'
import Searchbar from './components/Searchbar'
import Sidebar from './components/Sidebar'
import type { Cafe } from './types'



function App() {
const [cafes, SetCafes] = useState<Cafe[]>([])
const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null)
const [currentRating, setCurrentRating] = useState<Cafe | null>(null)

useEffect(() => {
  const fetchcafes = async () => {
const { data } = await supabase.from('cafes').select('*')
SetCafes(data ?? [])
  }
  fetchcafes();
  // fetch data here
}, []) // empty array = runs once on load

useEffect(() => {
console.log(cafes)
}, [cafes])

useEffect(() => {
  console.log(selectedCafe, currentRating)
}, [selectedCafe])

  return (
    <div className="app">
      <div className="searchbar-container">
        <Searchbar cafes={cafes} onSelect={setSelectedCafe} />
      </div>
      <Sidebar cafes={cafes} selectedCafe={selectedCafe} onRate={setCurrentRating}/>
      <Map cafes={cafes} onSelectCafe={setSelectedCafe} />
    </div>
  )
}
export default App

