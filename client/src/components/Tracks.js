import React, { useState, useEffect } from 'react';
import { getTopTracksS, getTopTracksM, getTopTracksL } from '../api'
import TrackCard from './TrackCard'
import Loader from './Loader'

export default function Tracks() {
	const [range, setRange] = useState('long')
	const [tracks, setTracks] = useState(null)

	const api = {
		'long': getTopTracksL(),
		'medium': getTopTracksM(),
		'short': getTopTracksS()
	}

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await api[range]
			setTracks(data);
		}
		fetchData()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [range])

	const styles = {
		'border': '2px solid #fff',
    		'borderRadius': '8px'
	}

    return (
		<div className='tracks'>
			<div className='tracks--text'>Top tracks</div>
			<div className='tracks--range'>
				<button onClick={() => setRange('long')} style={range === 'long' ? styles : null}>All Time</button>
				<button onClick={() => setRange('medium')} style={range === 'medium' ? styles : null}>Last 6 months</button>
				<button onClick={() => setRange('short')} style={range === 'short' ? styles : null}>Last 4 weeks</button>
			</div>
			{tracks ?
				<div className='tracks--cards'>
					{tracks.items.map((item, index) => <TrackCard key={index} item={item} number={index + 1} />)}
				</div>	:
				<Loader />
			}
		</div>
    )
}