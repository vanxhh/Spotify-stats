import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylistInfo } from '../../api';
import HorizontalCard from '../Cards/HorizontalCard';
import Loader from '../Loader/Loader';

const PlaylistInfo = () => {
	const { playlistID } = useParams();
	const [playlist, setPlaylist] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getPlaylistInfo(playlistID);
			setPlaylist(data.playlist);
		}
		fetchData();
	}, [playlistID]);

	return (
		<>
			{playlist ? 
				<main className='p-4 md:p-8'>
					<section className='flex items-center gap-4 flex-wrap md:gap-8'>
						<div className='h-28 w-28 md:h-40 md:w-40 lg:h-52 lg:w-52'>
							<img className='h-full w-full object-cover' src={playlist.images[0].url} alt='playlist' />
						</div>

						<div className='overflow-hidden flex flex-col gap-4'>
							<div>
								<a href={playlist.external_urls.spotify} target='_blank' rel='noreferrer noopener'>
									<h1 className='text-xl md:text-2xl font-bold tracking-wide hover:text-green-primary transition'>{playlist.name}</h1>
								</a>

								<div className='capitalize text-muted-text text-sm md:text-base'>Playlist</div>
							</div>

							<div className='text-sm md:text-base'>
								<span className='hover:text-green-secondary transition'>
									<a href={playlist.owner.external_urls.spotify} target='_blank' rel='noreferrer noopener'>{playlist.owner.display_name}</a>
								</span>
								<span> ● {playlist.followers.total} likes ● {playlist.tracks.total} songs</span>
							</div>
						</div>
					</section>

					<section className='mt-8 md:mt-12'>
						<h1 className='text-xl md:text-2xl font-bold tracking-wider'>Songs</h1>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
							{
								playlist.tracks.items.map((item, index) => (
									<HorizontalCard key={index} item={item.track} index={index + 1} />
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

export default PlaylistInfo;
