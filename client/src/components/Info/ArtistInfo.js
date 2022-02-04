import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArtistInfo } from '../../api';
import { followerCalc } from '../../utils';
import Loader from '../Loader/Loader';

const ArtistInfo = () => {
	const { artistID } = useParams();
	const [artist, setArtist] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getArtistInfo(artistID);
			setArtist(data.artist);
		}
		fetchData();
	}, [artistID]);

	return (
		<>
		{artist ?
			<main className='p-4 md:p-8'>
				<section className='flex flex-col items-center gap-4 md:gap-8'>
					<div className='h-32 w-32 md:h-48 md:w-48 lg:h-64 lg:w-64'>
						<img className='h-full w-full rounded-full' src={artist.images[0].url} alt='artist' />
					</div>

					<div>
						<a href={artist.external_urls.spotify} target='_blank' rel='noreferrer noopener'>
							<h1 className='text-xl md:text-2xl font-bold tracking-wide hover:text-green-primary transition'>{artist.name}</h1>
						</a>
					</div>

					<div className='flex gap-4 md:gap-6 lg:gap-8'>
						<div>
							<div className='text-center tracking-widest font-bold'>{followerCalc(artist.followers.total)}</div>
							<div className='tracking-wide'>FOLLOWERS</div>
						</div>
						<div>
							<div className='text-center tracking-widest font-bold'>{artist.popularity}%</div>
							<div className='tracking-wide'>POPULARITY</div>
						</div>
					</div>
				</section>

				<section className='mt-8 md:mt-12 flex flex-col gap-4'>
					<h2 className='text-lg md:text-xl font-bold tracking-wide'>Genres</h2>

					<ul className='text-decoration-none grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 cursor-pointer'>
						{
							artist.genres.map((item, index) => (
								<li key={index} className='p-4 capitalize bg-black-tertiary rounded hover:bg-hover'>{item}</li>
							))
						}
					</ul>
				</section>
			</main>
			:
			<Loader />
		}
		</>
	);
}

export default ArtistInfo;
