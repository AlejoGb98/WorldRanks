import Image from 'next/image'
import { useState, useEffect } from 'react'

//Images and logos Imports

import Tick from '../images/Done_round.png'
import Down from '../images/Expand_down.png'
import ContinentButton from '@/components/continentButton'
import StatusCheckbox from '@/components/statusCheckbox'
import TableCountries from '@/components/tableCountries'
import Spinner from '@/components/spinner'
import Layout from '@/components_layout/layout'
import SearchBar from '@/components/searchBar'


export default function Home({res}) {

  const [isLoading, setIsLoading] = useState(false)
 
  //API res reasign and useState
  useEffect( () => {
    if (res && res.length > 0){
      const orderByPop = [...res].sort((a,b) => b.population - a.population )
      setNewRes(orderByPop)
      //console.log("Array ordenado", orderByPop)
    } 
  }, []) 

  const [newRes, setNewRes] = useState()

  const [resInUse, setResInUse] = useState(newRes)


  //Array that save the Continents to filter countries
  const [filteredByContinent, setFilteredByContinent] = useState([]);
  
  
  const [savedRegionFilter, setSavedRegionFilter] = useState([])

  //Status of Independent and United Nations checkboxes
  const [independentCheck, setIndependentCheck] = useState(false)
  const [unitedNationCheck, setUnitedNationCheck] = useState(false)

  //Filter by region options
  const regionFilter = (filterValue) => {
    setIsLoading(true)
    if(filterValue === 'Population')
      {
        const newArrayFiltered = [...newRes].sort((a,b) => b.population - a.population )
        setNewRes(newArrayFiltered)
      } else if( filterValue === 'Name')
      {
        const newArrayFiltered = [...newRes].sort((a,b) => a.name.common < b.name.common ?  -1 : 1)
        setNewRes(newArrayFiltered)
      } else if(filterValue === 'Area (km²)')
      {
        const newArrayFiltered = [...newRes].sort((a,b) => b.area - a.area )
        setNewRes(newArrayFiltered)
      }

      setSavedRegionFilter(filterValue)

      setTimeout( () => {
        setIsLoading(false)
      }, 1000)
  }

  //Filter by continents on the component
  const continentFilter = filterValue => {
        //prevFilteredByContinent is a previous variable with the value of filteredByContinent
    setFilteredByContinent((prevFilteredByContinent) => {
      if(prevFilteredByContinent?.some(continentState => continentState === filterValue)){

        return prevFilteredByContinent.filter(continent => continent !== filterValue);

      } else{

        return [...prevFilteredByContinent, filterValue]
       
      }
    })
    setNewRes(res)
  }
    
  useEffect(() => {
    setIsLoading(true)

    if(filteredByContinent.length > 0){
      setNewRes( () => {
        const filteredCountries = newRes.filter((country) => {
          return filteredByContinent.some((continent) => continent === country.region);
        });
        return(filteredCountries)
      })
    }
    
    //regionFilter(savedRegionFilter)
    setTimeout( () => {
      setIsLoading(false)
    }, 1000)

  },[filteredByContinent])


  //Filter by status
  /* const statusFilter = () => {

    if(independentCheck) {
      const independentCountries = newRes.filter((country) => {
        return country.independent === true
      })
      setNewRes(independentCountries)
    } else{
      setNewRes(resPreFilter)
    }
    continentFilter()
  } 

  useEffect(() => {
    statusFilter();
  },[independentCheck, unitedNationCheck])
 */

  
  

  return (
    <Layout
      title={'Home'}
    >
      <main className='bg-black flex flex-col items-center min-h-screen'>
        
      <section className='w-11/12 border bg-black border-darkgrey rounded-lg py-4 px-6 relative mt-72 mb-12'>
        <div className='flex justify-between items-center text-lightgrey mb-10'>
          <p className='font-semibold text-lg'>Found {newRes?.length} countries</p>
      
          <SearchBar />
        </div>

        <div className={`grid grid-cols-4 h-full gap-4 ${isLoading ? 'min-h-screen' : ''}`}>
          <aside className='col-span-1'>
            <div className='sticky top-10'>
              <div className='mb-10'>
                <p className='text-lightgrey mb-2'>
                  Sort by
                </p>

                <select className='w-full bg-black text-white font-medium py-2 px-3 rounded-xl border border-darkgrey'
                        onChange={e => regionFilter(e.target.value)}
                > 

                  <option>Population</option>
                  <option>Name</option>
                  <option>Area (km²)</option>

                </select>
              </div>

              <div className='mb-10'>
                <p className='text-lightgrey mb-2'>
                  Region
                </p>

                <div className='flex flex-wrap gap-x-2'>
                  <ContinentButton text={'Americas'} filter={continentFilter}/>
                  <ContinentButton text={'Antartic'} filter={continentFilter}/>
                  <ContinentButton text={'Africa'} filter={continentFilter}/>
                  <ContinentButton text={'Asia'} filter={continentFilter}/>
                  <ContinentButton text={'Europe'} filter={continentFilter}/>
                  <ContinentButton text={'Oceania'} filter={continentFilter}/>
                </div>

              </div>

              <div className=''>
                <p className='text-lightgrey mb-2'>
                  Status
                </p>

                <div>
                  <StatusCheckbox text={'Member of the United Nations'} check={setUnitedNationCheck}/>
                  <StatusCheckbox text={'Independent'} check={setIndependentCheck}/>
                </div>
              </div>
  
            </div>
          </aside>

          {/* ----------- COUNTRIE TABLES------------ */}

          <div className='col-span-3'>
            {/* {isLoading && <Spinner/>} */}
            <table className='w-full text-left border-spacing'>
              <thead className={`text-lightgrey border-b-2 ${isLoading ? 'hidden' : ''}`}>
                <tr className=''>
                  <th className='font-normal'>Flag</th>
                  <th className='font-normal'>Name</th>
                  <th className='font-normal'>Population</th>
                  <th className='font-normal'>Area (km²)</th>
                  <th className='font-normal'>Region</th>
                </tr>
              </thead>

              <tbody className=''>
                
                {isLoading ? <Spinner/> :
                  newRes?.map((country) => (
                  <TableCountries
                    key={country.cca3}
                    flag={country.flags.svg}
                    name={country.name.common}
                    population={country.population}
                    area={country.area}
                    region={country.region}                    
                  />
                ))}
                
              </tbody>
            </table>
          </div>

        </div>

      </section>
        
    </main>
   </Layout>
  )

}


export async function getServerSideProps(){
  const resp = await fetch(`https://restcountries.com/v3.1/all`)
  const res = await resp.json();

  return{
    props:{
      res
    } 
  }
}

