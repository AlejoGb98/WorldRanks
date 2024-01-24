import Link from "next/link"
import Image from "next/image"

const BorderCard = ({name, flags}) => {
  return (
    <div className="flex flex-col items-center min-w-max mr-6 ">
        <Link href={`${name}`}>
          <Image src={flags} alt={`${name} flag`} height={500} width={1000} className='rounded-md aspect-video object-cover w-12 h-8 md:w-24 md:h-16'/>
        </Link> 
       <p className="text-white text-sm md:text-base mt-2">{name}</p>
    </div>
  )
}

export default BorderCard
