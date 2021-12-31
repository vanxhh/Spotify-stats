import React, { useState, useEffect } from 'react';
import { getTopArtistsS, getTopArtistsM, getTopArtistsL } from '../api'
import ArtistCard from './ArtistCard'
import Loader from './Loader'

export default function Artists() {
	const [range, setRange] = useState('long')
	const [artists, setArtists] = useState(null)

	const api = {
		'long': getTopArtistsL(),
		'medium': getTopArtistsM(),
		'short': getTopArtistsS()
	}

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await api[range]
			setArtists(data);
		}
		fetchData()
	}, [range])

	const styles = {
		'border': '2px solid #fff',
    		'borderRadius': '8px'
	}

    return (
		<div className='artist'>
			<div className='artist--text'>Top artists</div>
			<div className='artist--range'>
				<button onClick={() => setRange('long')} style={range === 'long' ? styles : null}>All Time</button>
				<button onClick={() => setRange('medium')} style={range === 'medium' ? styles : null}>Last 6 months</button>
				<button onClick={() => setRange('short')} style={range === 'short' ? styles : null}>Last 4 weeks</button>
			</div>
			{artists ? 
				<div className='artist--cards'>
					{artists.items.map((item, index) => <ArtistCard key={index} item={item} number={index + 1} />)}
				</div>	:
				<Loader />
			}
		</div>
    )
}