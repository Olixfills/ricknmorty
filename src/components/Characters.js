import React, { useState } from 'react'
import { useQuery } from 'react-query';
import Char from './Char';


const Characters = () => {
    const [page, setPage]=useState(1)

    const fetchChars = async ({queryKey}) => {
        const res = await fetch(`https://rickandmortyapi.com/api/character?page=${queryKey[1]}`);
        return res.json();
    };
    
    const {data, status, isPreviousData} = useQuery(['characters', page], fetchChars, {keepPreviousData: true})
    
    console.log(status);
    if (status === 'loading') {
        return <div>Loading...</div>
    } if (status === 'error') {
        return <div>Error</div>
    }
    
    return <div className='characters'>
        {data.results.map(character => (
            <Char character={character}/>
        ))}
        <div>
            <button disabled={page === 1} onClick={()=>setPage(page - 1)}>Prev</button>
            <button disabled={isPreviousData && page === data.info.pages} onClick={()=>setPage(page + 1)}>Next</button>
        </div>
    </div>

}

export default Characters