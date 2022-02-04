import React, { useContext } from 'react';
import { DataContext } from '../../App';
import Loader from '../Loader/Loader';
import VerticalCard from '../Cards/VerticalCard';
import HorizontalCard from '../Cards/HorizontalCard';

const Home = () => {
	const { userData, userFollowing, userPlaylists, topArtistsS, topTracksS } = useContext(DataContext);

	return (
		<>
			{(userData && userFollowing && userPlaylists && topArtistsS && topTracksS) ?
				<main className='p-4 md:p-8 flex flex-col gap-y-12 md:gap-y-20'>
					<div className='flex flex-col items-center gap-y-4'>
						
						<div>
							<img className='rounded-full h-20 w-20 md:h-28 md:w-28 lg:h-32 lg:w-32' src={userData.images[0].url} alt='profile' />
						</div>

						<a className='text-lg md:text-xl lg:text-2xl hover:text-green-primary tracking-wider font-bold transition' href={userData.external_urls.spotify} target='_blank' rel='noreferrer noopener'>{userData.display_name}</a>

						<div className='flex gap-x-4 text-xs md:text-base'>
							<div>
								<div className='text-center'>{userFollowing.artists.items.length || 0}</div>
								<p>FOLLOWING</p>
							</div>
							<div>
								<div className='text-center'>{userData.followers.total}</div>
								<p>FOLLOWERS</p>
							</div>
							<div>
								<div className='text-center'>{userPlaylists.items.length || 0}</div>
								<a href='/playlists'><p className='hover:text-green-primary'>PLAYLISTS</p></a>
							</div>
						</div>

					</div>
					<section className='flex flex-col gap-y-4'>

						<div className='flex justify-between items-center'>
							<p className='text-lg font-bold md:tracking-wide md:text-xl'>Top artists this month</p>
							<a href='/artists' className='text-muted-text hover:underline underline-offset-2'>
								See all
							</a>
						</div>

						<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4'>
							{
								topArtistsS.items.slice(0, 5).map((item, index) => (
									<VerticalCard
										key={index}
										item={item}
									/>))
							}
						</div>

					</section>
					<section className='flex flex-col gap-y-4'>

						<div className='flex justify-between items-center'>
							<p className='text-lg font-bold md:tracking-wide md:text-xl'>Top tracks this month</p>
							<a href='/tracks' className='text-muted-text hover:underline underline-offset-2'>
								See all
							</a>
						</div>

						<div className='flex flex-col gap-4'>
							{
								topTracksS.items.slice(0, 5).map((item, index) => (
									<HorizontalCard
										key={index}
										item={item}
										index={index + 1}
									/>))
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

export default Home;
