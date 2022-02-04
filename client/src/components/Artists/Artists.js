import React, { useState, useContext } from 'react';
import { DataContext } from '../../App';
import VerticalCard from '../Cards/VerticalCard';
import Loader from '../Loader/Loader';

const Artists = () => {
	const { topArtistsS, topArtistsM, topArtistsL } = useContext(DataContext);

	const [selected, setSelected] = useState('all-time');

	const handleSelection = (changedSelection) => setSelected(changedSelection);

	const styles = {
		backgroundColor: '#fff',
		color: '#000'
	}

	return (
		<>
			{(topArtistsS && topArtistsM && topArtistsL) ?
				<main className='p-4 md:p-8'>
					<h1 className='text-xl md:text-2xl font-bold tracking-wider'>Top Tracks</h1>

					<div className='mt-4 flex justify-between'>
						<button
							className='p-2 rounded border-2 border-white text-xs md:text-sm w-20 md:w-32'
							onClick={() => handleSelection('all-time')}
							style={selected === 'all-time' ? styles : null}
						>
							All Time
						</button>
						<button
							className='p-2 rounded border-2 border-white text-xs md:text-sm w-20 md:w-32'
							onClick={() => handleSelection('6-months')}
							style={selected === '6-months' ? styles : null}
						>
							Past 6 months
						</button>
						<button
							className='p-2 rounded border-2 border-white text-xs md:text-sm w-20 md:w-32'
							onClick={() => handleSelection('4-weeks')}
							style={selected === '4-weeks' ? styles : null}
						>
							Past 4 weeks
						</button>
					</div>

					<section className='mt-4 md:mt-8'>
						<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4'>
							{selected === 'all-time' &&
								topArtistsL.items.map((item, index) => (
									<VerticalCard key={index} item={item} />
								))
							}
							{selected === '6-months' &&
								topArtistsM.items.map((item, index) => (
									<VerticalCard key={index} item={item} />
								))
							}
							{selected === '4-weeks' &&
								topArtistsS.items.map((item, index) => (
									<VerticalCard key={index} item={item} />
								))
							}
						</div>
					</section>
					
				</main>
				:
				<Loader />
			}
		</>
	);
}

export default Artists;
