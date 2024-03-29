import Image from "next/image"
import NavImage from '../images/hero-image-wr.jpg'
import Logo from '../images/Logo.png'

const Header = () => {
  return (
    <div className='flex items-center sm:absolute justify-center'>
          <Image src={NavImage} width={4000} height={4000} alt='Image of top'
                className=''      
          />

          <div className='absolute'>
            <Image src={Logo} width={2000} height={2000} alt='Logo image'
                  className='w-24
                            lg:w-72 md:w-48'
            />
          </div>
    </div>
  )
}

export default Header
