import Image from "next/image"
import Link from "next/link"

const TableCountries = ({flag, name, population, area, region}) => {

  const formatedPopulation = population.toLocaleString('en-US')
  const formatedArea = area.toLocaleString('en-US')
  
  return (
      <tr className="text-white">
        
          <td className="py-3">
            {/* <Link href={`country/${name}`} className="relative"> */}
              <Image src={flag} width={100} height={100} alt={`${name} flag`} className="w-14 h-10 object-cover aspect-video rounded-md"/>
            {/* </Link> */}
          </td>
        

        {/* <Link href={`country/${name}`} className="relative top-5"> */}
          <td>{name}</td>
        {/* </Link> */}

        <td>{formatedPopulation}</td>
        <td>{formatedArea}</td>
        <td>{region}</td>
      </tr>
  )
}

export default TableCountries
