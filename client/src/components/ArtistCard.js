/* eslint-disable react/jsx-no-target-blank */
import React from 'react';

export default function ArtistCard(props) {
	return (
		<div className='card'>
            <div className='card--number artist--card--number'>{props.number}</div>
            <img src={props.item.images[2].url} className='card--img' alt='artist-pfp'></img>
            <div className='card--info'>
                <div className='card--text'>
                    <div className='card--name artist--card--name'>
                        <a href={props.item.external_urls.spotify} target='_blank'>{props.item.name}</a>
                    </div>
                </div>
            </div>
        </div>
    )
}