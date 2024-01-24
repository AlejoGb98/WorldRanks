import Image from "next/image"
import Link from "next/link"

const TableCountries = ({flag, name, population, area, region, screenWidth}) => {

  const formatedPopulation = population.toLocaleString('en-US')
  const formatedArea = area.toLocaleString('en-US')
  
  return (
      <tr className="text-white text-xs 
                        md:text-lg lg:text-xl">
        
          <td className="py-3">
            <Link href={`country/${name}`} className="relative"> 
              <Image src={flag} width={100} height={100} alt={`${name} flag`} className="w-10 h-6 md:w-14 md:h-10 object-cover aspect-video rounded-md"/>
            </Link> 
          </td>
        

         {/* <Link href={`country/${name}`} className="relative top-5"> */}
          <td>{name}</td>
         {/* </Link> */} 

        <td>{formatedPopulation}</td>
        <td>{formatedArea}</td>
        {
          screenWidth > 1024 && <td>{region}</td>
        }
      </tr>
  )
}

export default TableCountries
