import React, { useContext } from 'react';
import { DataContext } from '../../App';
import VerticalCard from '../Cards/VerticalCard';
import Loader from '../Loader/Loader';

const Playlists = () => {
	const { userPlaylists } = useContext(DataContext);

	return (
		<>
			{userPlaylists ?
				<main className='p-4 md:p-8'>
					<h1 className='text-xl md:text-2xl font-bold tracking-wider'>Playlists</h1>

					<section className='mt-4 md:mt-8'>
						<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 place-items-stretch'>
							{
								userPlaylists.items.map((item, index) => (
									<VerticalCard key={index} item={item} type={'playlist'} />
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

export default Playlists;
