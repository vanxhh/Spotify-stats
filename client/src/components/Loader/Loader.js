import React from 'react';

export default function Loader() {
	return (
		<div className='min-h-screen flex items-center justify-center'>
			<div className='h-12 w-12 border-4 rounded-full border-gray-500 border-t-4 border-t-white animate-spin'></div>
		</div>
	)
}