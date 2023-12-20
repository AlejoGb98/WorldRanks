import Image from "next/image"
import Link from "next/link"

const SearchResult = ({name, flag, error}) => {
    
  return (
    <Link href={`/country/${name}`}>
    <div className="flex w-full gap-6 px-6 py-3 items-center">
        <Image src={flag} height={1000} width={1000} className="w-14 h-10 object-cover aspect-video rounded-md" alt={`${name} flag`}/>
        <p className="text-white">{name}</p>
    </div>
    </Link>
  )
}

export default SearchResult
