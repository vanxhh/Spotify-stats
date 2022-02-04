import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTrackInfo } from '../../api';
import { timeCalc } from '../../utils';
import VerticalCard from '../Cards/VerticalCard';
import Loader from '../Loader/Loader';

const TrackInfo = () => {
	const { trackID } = useParams();
	const [track, setTrack] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getTrackInfo(trackID);
			setTrack(data.track);
		}
		fetchData();
	}, [trackID]);

	return (
		<>
			{track ?
				<main className='p-4 md:p-8'>
					<section className='flex items-center gap-4 flex-wrap md:gap-8'>
						<div className='h-28 w-28 md:h-40 md:w-40 lg:h-52 lg:w-52'>
							<img className='h-full w-full' src={track.album.images[0].url} alt='track' />
						</div>

						<div className='overflow-hidden flex flex-col gap-4'>
							<div>
								<a href={track.external_urls.spotify} target='_blank' rel='noreferrer noopener'>
									<h1 className='text-xl md:text-2xl font-bold tracking-wide hover:text-green-primary transition'>{track.name}</h1>
								</a>
								<div className='capitalize text-muted-text text-sm md:text-base'>{track.album.name} - {track.album.release_date.slice(0, 4)}</div>
								<div className='capitalize text-muted-text text-sm md:text-base'>{timeCalc(track.duration_ms)} </div>
							</div>
							<a href={track.external_urls.spotify} target='_blank' rel='noreferrer noopener'>
								<button className='h-8 w-24 bg-green-primary rounded-full hover:bg-green-secondary transition font-semibold'>Play</button>
							</a>
						</div>
					</section>

					<section className='mt-8 md:mt-12'>
						<h1 className='text-xl md:text-2xl font-bold tracking-wide'>Artists</h1>
						<div className='mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4'>
							{track.artists &&
								track.artists.map((item, index) => <VerticalCard key={index} item={item} />)
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

export default TrackInfo;
