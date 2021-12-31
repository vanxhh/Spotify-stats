/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { timeCalc } from '../utils'

export default function TrackCard(props) {
    return (
        <div className='card'>
            <div className='card--number'>{props.number}</div>
            <img src={props.item.album.images[2].url} className='card--img' alt='artist-pfp'></img>
            <div className='card--info'>
                <div className='card--text'>
                    <div className='card--name'>
                        <a href={props.item.external_urls.spotify} target='_blank'>{props.item.name}</a>
                    </div> 
                    <div className='card--artist'>{props.item.album.artists[0].name}</div>
                </div>
                <div className='card--duration'>{timeCalc(props.item.duration_ms)}</div>
            </div>
        </div>
    )
}