import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../api';
import Tracks from './Tracks'
import Artists from './Artists'
import RecentCard from './RecentCard';
import Navbar from './Navbar';
import Loader from './Loader';
import Footer from './Footer';

export default function Profile({ logout }) {
    const [data, setData] = useState(null)
    const [playlists, setPlaylists] = useState(null)
    const [following, setFollowing] = useState(null)
    const [recent, setRecent] = useState(null)
    const [selected, setSelected] = useState('tracks')

    useEffect(() => {
        const fetchData = async () => {
            const { user, follow, pLists, recentlyPlayed } = await getUserInfo()
            setData(user)
            setFollowing(follow)
            setPlaylists(pLists)
            setRecent(recentlyPlayed)
        }
        fetchData()
    }, [])

    const handleSelected = elem => {
        setSelected(elem)
    }

    return (
        <div className='profile'>
            <Navbar logout={logout} />
            {data ?
                <div className='profile--wrapper'>
                    <img src={data.images[0].url} className='profile--img' alt='pfp'></img>
                    {data.display_name ? <div className='profile--name'><a href={data.external_urls.spotify}>{data.display_name}</a></div> : null}
                    <div className='profile--data'>
                        <div className='profile--data__content'>
                            <div className='number'>{playlists && playlists.items.length}</div>
                            <div className='number--text'>PLAYLISTS</div>
                        </div>
                        <div className='profile--data__content'>
                            <div className='number'>{data && data.followers.total}</div>
                            <div className='number--text'>FOLLOWERS</div>
                        </div>
                        <div className='profile--data__content'>
                            <div className='number'>{following && following.artists.items.length}</div>
                            <div className='number--text'>FOLLOWING</div>
                        </div>
                    </div>
                </div> :
                <Loader />
            }
            {selected === 'tracks' && <Tracks />}
            {selected === 'artists' && <Artists />}
            {(selected === 'recent' && recent) &&
                <div className='tracks'>
                    <div className='tracks--text'>Recently played</div>
                    <div className='tracks--cards'>
                        {recent.items.map((item, index) => <RecentCard key={index} item={item} number={index + 1} />)}
                    </div>
                </div>
            }
            {data && 
                <Footer selected={selected} handleSelected={handleSelected} />
            }
        </div>
    )
}
