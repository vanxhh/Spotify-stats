import React from 'react';
import { timeCalc } from '../../utils';

const HorizontalCard = ({ item, index }) => {
	return (
		<a href={`/track/${item.id}`}>
			<div className='flex items-center gap-x-4 p-2 rounded bg-black-tertiary hover:bg-hover md:p-4'>

				<div className='flex items-center gap-x-2'>
					<span className='w-2 text-xs'>{index}</span>

					<div className='h-12 w-12 md:h-16 md:w-16'>
						<img className='h-full w-full' src={item.album.images[0].url} alt='track' />
					</div>
				</div>

				<div className='flex flex-1 gap-x-4 items-center justify-between'>
					<div className='text-xs md:text-sm text-muted-text'>
						<p className='overflow-hidden text-sm md:text-base font-bold hover:text-green-primary transition'>{item.name}</p>{item.artists[0].name}
					</div>
					<span className='justify-self-end text-xs text-muted-text'>{timeCalc(item.duration_ms)}</span>
				</div>

			</div>
		</a>
	);
}

export default HorizontalCard;
