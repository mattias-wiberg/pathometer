import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { TypographyH3 } from '@/components/ui/typography'
import { useAuth } from '@/context/AuthContext'
import { MdModeOfTravel } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { NotebookText } from 'lucide-react'
import { UserNav } from '@/components/ui/user-nav'

const Navbar = () => {
  const user = useAuth()

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <NavLink to='/' className='flex items-center'>
          <MdModeOfTravel size={32} />
          <TypographyH3 className='ml-2'>Work Travel Tracker</TypographyH3>
          <p className={`mt-6 text-xs`}>
            {import.meta.env.VITE_VERSION}
          </p>
        </NavLink>

        <div className="ml-auto flex items-center space-x-4">
          {
            user && (
              <>
                <Button variant="outline" size="icon">
                  <NotebookText className="absolute h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">Add Trip</span>
                </Button>
                <UserNav />
              </>
            )
          }
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}

export default Navbar