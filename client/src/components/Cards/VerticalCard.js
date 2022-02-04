import React from 'react';

const VerticalCard = ({ item, type }) => {
	return (
		<a href={type !== 'playlist' ? `/artist/${item.id}` : `/playlist/${item.id}`}>
			<div className='cursor-pointer flex flex-col gap-y-2 p-4 bg-black-tertiary rounded hover:bg-hover'>

				{item.images &&
					<div className='h-24 w-24 md:h-32 md:w-32 lg:h-40 lg:w-40 m-auto mb-2'>
						<img className={`h-full w-full object-cover ${type !== 'playlist' && 'rounded-full'}`} src={item.images[0].url} alt='artist' />
					</div>
				}
				
				<div className=''>
					<div className='truncate text-base font-bold hover:text-green-primary transition'>{item.name}</div>
					<span className='text-sm text-muted-text'>
						{type !== 'playlist' ? 'Artist' : 'Playlist'}
					</span>
				</div>
				
			</div>
		</a>
	);
}

export default VerticalCard;
