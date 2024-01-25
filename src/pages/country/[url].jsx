import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

import Layout from "@/components_layout/layout"
import BorderCard from "@/components/borderCard"

const Countrie = ({countryData, allCountriesData}) => {
  
  const {flags, name, population, area, capital, subregion, languages, currencies, continents, borders} = countryData && countryData[0] || {}

  const [bordersData, setBorderData] = useState()

  
  const currencyName = currencies && Object.values(currencies)
  const languageName = languages && Object.values(languages)
  
 
  useEffect(() => {
    setBorderData(() => {
      const bordersData = allCountriesData.filter(data => {
        return borders?.some(border => border === data.cca3)
      })
      return bordersData
    })
  },[countryData])  
 
  const formatToUS = (toFormat) => {
    return toFormat.toLocaleString('en-US')
  }


  return (
    <Layout
      title={`${name.common}`}
    >
      <main className='bg-black flex flex-col items-center min-h-screen'>

        {<Link href={'/'}>
          <p className="text-lg text-white absolute top-96 left-12 hover:scale-110 transition-all ">Go Home</p>
        </Link>}

        <section className="w-full md:w-7/12 border bg-black border-darkgrey md:rounded-lg md:py-6
                            relative md:mt-72 md:mb-24 flex flex-col items-center shadow-ultrablack shadow-2xl">

          <Image src={flags.svg} width={1000} height={1000} alt={`${name.common} flag`} className="w-40 h-28 md:w-80 md:h-60 rounded-xl object-cover relative -top-6 md:-top-16"/>
          
          <h2 className="text-white text-2xl md:text-5xl">{name.common}</h2>
          <h3 className="text-white text-lg md:text-2xl">{name.official}</h3>

          <div className="flex justify-around w-full text-white text-xs md:text-lg font-light md:px-12 my-12">
            <div className="flex w-fit bg-darkgrey py-2 md:py-4 px-2 md:px-6 rounded-2xl gap-2 md:gap-4 items-center">

              <p className="border-r-2 pr-2 md:pr-4 border-black">Population</p>
              <p>{formatToUS(population)}</p>

            </div>

            <div className="flex w-fit bg-darkgrey py-2 md:py-4 px-2 md:px-6 rounded-2xl gap-2 md:gap-4 items-center">

              <p className="border-r-2 pr-2 md:pr-4 border-black"> Area (km²)</p>
              <p>{formatToUS(area)}</p>

            </div>
          </div>

          <div className="flex justify-between w-full text-sm md:text-lg py-3 md:py-6 border-t-2 px-6 border-darkgrey">
            <p className="text-lightgrey">Capital</p>
            <p className="text-white">{capital ? capital : 'No capital info '}</p>
          </div>

          <div className="flex justify-between w-full text-sm md:text-lg py-3 md:py-6 border-t-2 px-6 border-darkgrey">
            <p className="text-lightgrey">Subregion</p>
            <p className="text-white">{subregion ? subregion : 'No subregion info'}</p>
          </div>

          <div className="flex justify-between w-full text-sm md:text-lg py-3 md:py-6 border-t-2 px-6 border-darkgrey">
            <p className="text-lightgrey">Language</p>
            <p className="text-white">{languageName != undefined ? languageName[0] : "No language info"}</p>
          </div>

          <div className="flex justify-between w-full text-sm md:text-lg py-3 md:py-6 border-t-2 px-6 border-darkgrey">
            <p className="text-lightgrey">Currencies</p>
            <p className="text-white">{currencyName != undefined ? currencyName[0].name : "No currency info"}</p>
          </div>

          <div className="flex justify-between w-full text-sm md:text-lg py-3 md:py-6 border-y-2 px-6 border-darkgrey">
            <p className="text-lightgrey">Continent</p>
            <p className="text-white">{continents ? continents : "No continent info"}</p>
          </div>

          <div className={`w-full text-sm md:text-lg py-3 md:py-6 px-6 border-darkgrey ${bordersData?.length == 0 && 'flex justify-between' }`}>
            <p className="text-lightgrey mb-6">Neighbouring Countries</p>
            <div className='flex max-w-fit overflow-auto mb-2 md:mb-0'>
              {
                bordersData?.length > 0 ? 
                bordersData.map((country) => (
                  <BorderCard
                    key={country.name.common}
                    name={country.name.common}
                    flags={country.flags.svg}
                  />
                )) 
                :
                <p className="text-white">No borders countries</p>
              }
            </div>
          </div>

        </section>
      
      </main>
    </Layout>
  )

}

export default Countrie


export async function getStaticProps({params: {url}}){

    const [countryData, allCountriesData] = await Promise.all([
      fetch(`https://restcountries.com/v3.1/name/${url}?fullText=true`).then(response => response.json()),
      fetch(`https://restcountries.com/v3.1/all`).then(response => response.json())
    ])
    return{
        props:{
            countryData,
            allCountriesData
        }
    }
}

export async function getStaticPaths(){
    const response = await fetch (`https://restcountries.com/v3.1/all`)
    const result = await response.json();

    const paths = result.map(country => ({
        params : {
          url: country.name.common
        }}
    ))
    
    
    return{
      paths,
      fallback: false
    }
}