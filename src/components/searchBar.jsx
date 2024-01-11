import { useState, useEffect } from 'react'
import Image from 'next/image';

import Search from '../images/Search.png'
import SearchResult from './searchResult';


const SearchBar = () => {
    
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState()


    //Fetch data to Searchbar
    const handleSearch = (value) => {
        getDataSearch(value)
        setSearch(value)
    }

    async function getDataSearch(value){
        const resp = await fetch(`https://restcountries.com/v3.1/all`);
        const res = await resp.json();
      
        const searchResults = res.filter((country) => {
          return value && country && country.name.common.toLowerCase().includes(value.toLowerCase()) || country.region.toLowerCase().includes(value.toLowerCase()) /* || country.subregion.toLowerCase().includes(value.toLowerCase()) */
        })
        
        setSearchResult(searchResults)
    }

  return (
    <div className={`flex gap-2 bg-darkgrey py-2 w-2/6 right-0 text-lightgrey relative z-20 mb-4 ${search ? 'rounded-t-xl' : 'rounded-xl'}`}>
        <Image src={Search} width={25} height={25} alt='Search' className='mx-2'/>
        <input type='text' placeholder='Search by Name, Region, Subregion' value={search}
                className='placeholder-lightgrey text-sm font-medium bg-darkgrey w-full outline-none mx-2'
                onChange={ e => handleSearch(e.target.value)}/>
        
        <div className={`absolute w-full top-10 bg-darkgrey max-h-96 overflow-scroll rounded-b-xl ${searchResult?.length > 0 ? 'border-t-2 border-lightgrey' : ''}`}>
            {
                search && searchResult?.length === 0 ?
                    <p className={`text-white px-6 py-3 ${search ? 'border-t-2 border-lightgrey' : ''}`}>No matches found</p>
                    :
                    searchResult?.map( country => (
                        <SearchResult
                            name={country.name.common}
                            flag={country.flags.svg}
                        />
                    ))
                    

            }
        </div>
    </div>
  )
}

export default SearchBar


