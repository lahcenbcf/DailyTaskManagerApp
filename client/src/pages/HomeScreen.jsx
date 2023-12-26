import {SectionWrapper} from "../hoc/index"
import tmBg from "../assets/tmBg.png"
import { Link } from 'react-router-dom'
import bg1 from "../assets/bg1.png"
import bg2 from "../assets/bg2.png"
function HomeScreen() {
  return (
    <div className="relative inset-0 h-screen px-6">
        
    <div className='absolute top-[100px] flex flex-wrap gap-[3rem]'>
         { /* left side */}
          <div className='flex-fluid'>
                <h1 className='font-extrabold text-darkBlue w-10/12 mb-8'>Manage your tasks easily with <span className='text-primary'>simpli.</span> </h1>
                <Link to={"/register"}  className='bg-primary text-white font-bold px-4 py-2 rounded-xl text-xl'>Get Started</Link>      
          </div>

          {/* right side */}
          <div className='flex flex-fluid max-w-[40rem]'>
              <img src={tmBg} alt='tmBackground' className='w-full object-cover' />
          </div>

          {/* background 1 */}
      <div className="max-w-5xl w-full mx-auto my-14 relative">
      {/* balls */}
      <div className="h-32 w-32 rounded-full shadow-xl bg-primary opacity-75 -z-10 absolute -top-14 -right-20" />
      <div className="h-32 w-32 rounded-full shadow-xl bg-[#42b883] opacity-75 -z-10 absolute -bottom-14 -left-20 animate-bounce" />
      <div className="h-12 w-12 rounded-full shadow-xl bg-[#f8da5b] opacity-75 -z-10 absolute bottom-[50%] -left-20" />
      <img src={bg2} alt="bg1" className="w-full object-cover shadow-lg rounded-lg" />
      </div>

      {/* background 2 */}

      <div className="max-w-5xl w-full mx-auto my-14 relative">
      {/* balls */}
      <div className="h-32 w-32 rounded-full shadow-xl bg-primary opacity-75 -z-10 absolute top-[50%] -right-20 animate-spin" />
      <div className="h-32 w-32 rounded-full shadow-xl bg-[#f8da5b] opacity-75 -z-10 absolute -bottom-14 -left-20" />
      <div className="h-12 w-12 rounded-full shadow-xl bg-[#42b883] opacity-75 -z-10 absolute bottom-[50%] -left-20" />
      <img src={bg1} alt="bg1" className="w-full object-cover shadow-lg rounded-lg" />
      </div>



      <footer className="w-full bg-dark p-6">
            <p className="text-white font-bold text-center">all rights are researved</p>
      </footer>
      </div>
        
      
    </div>
  )
}

export default SectionWrapper(HomeScreen)
