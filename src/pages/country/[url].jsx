import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

import Layout from "@/components_layout/layout"
import BorderCard from "@/components/borderCard"

const Countrie = ({countryData, allCountriesData}) => {
  
  const {flags, name, population, area, capital, subregion, languages, currencies, continents, borders} = countryData[0]

  const [bordersData, setBorderData] = useState()

  const currencyName = Object.values(currencies)
  const languageName = Object.values(languages)

  //console.log(borders)

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

        <section className="w-7/12 border bg-black border-darkgrey rounded-lg py-6 
                            relative mt-72 mb-24 flex flex-col items-center shadow-ultrablack shadow-2xl">

          <Image src={flags.svg} width={1000} height={1000} alt={`${name.common} flag`} className="w-80 h-60 rounded-xl object-cover relative -top-16"/>
          
          <h2 className="text-white text-5xl">{name.common}</h2>
          <h3 className="text-white text-2xl">{name.official}</h3>

          <div className="flex justify-around w-full text-white text-lg font-light px-12 my-12">
            <div className="flex w-fit bg-darkgrey py-4 px-6 rounded-2xl gap-4">

              <p className=" border-r-2 pr-4 border-black">Population</p>
              <p>{formatToUS(population)}</p>

            </div>

            <div className="flex w-fit bg-darkgrey py-4 px-8 rounded-2xl gap-4">

              <p className="border-r-2 pr-4 border-black"> Area (km²)</p>
              <p>{formatToUS(area)}</p>

            </div>
          </div>

          <div className="flex justify-between w-full text-lg py-6 border-t-2 px-6 border-darkgrey">
            <p className="text-lightgrey">Capital</p>
            <p className="text-white">{capital}</p>
          </div>

          <div className="flex justify-between w-full text-lg py-6 border-t-2 px-6 border-darkgrey">
            <p className="text-lightgrey">Subregion</p>
            <p className="text-white">{subregion}</p>
          </div>

          <div className="flex justify-between w-full text-lg py-6 border-t-2 px-6 border-darkgrey">
            <p className="text-lightgrey">Language</p>
            <p className="text-white">{languageName[0]}</p>
          </div>

          <div className="flex justify-between w-full text-lg py-6 border-t-2 px-6 border-darkgrey">
            <p className="text-lightgrey">Currencies</p>
            <p className="text-white">{currencyName[0].name}</p>
          </div>

          <div className="flex justify-between w-full text-lg py-6 border-y-2 px-6 border-darkgrey">
            <p className="text-lightgrey">Continents</p>
            <p className="text-white">{continents}</p>
          </div>

          <div className={`w-full text-lg py-6 px-6 border-darkgrey ${bordersData?.length == 0 && 'flex justify-between' }`}>
            <p className="text-lightgrey mb-6">Neighbouring Countries</p>
            <div className="flex max-w-fit overflow-scroll">
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
    console.log(url)
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