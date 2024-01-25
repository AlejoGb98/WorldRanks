import Image from "next/image"
import Link from "next/link"

const SearchResult = ({name, flag, search}) => {
    
  
  return (
    <Link href={`/country/${name}`}>
    <div className={`flex w-full gap-4 md:gap-6 px-3 md:px-6 py-2 md:py-3 items-center ${!search && 'hidden'}`}>
        <Image src={flag} height={1000} width={1000} className='w-10 h-6 md:w-14 md:h-10 object-cover aspect-video rounded-md' alt={`${name} flag`}/>
        <p className="text-white">{name}</p>
    </div>
    </Link>
  )
}

export default SearchResult
