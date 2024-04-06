import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { TypographyH3 } from '@/components/ui/typography'
import { useAuth } from '@/context/AuthContext'
import { MdModeOfTravel } from 'react-icons/md'
import { NavLink } from 'react-router-dom'
import { UserNav } from '@/components/ui/user-nav'
import { Plus } from 'lucide-react'

const Navbar = () => {
  const user = useAuth()

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <NavLink to='/' className='flex items-center'>
          <MdModeOfTravel size={32} />
          <div className='flex flex-col ml-2'>
            <TypographyH3>Trackie</TypographyH3>
            <p className="text-xs leading-none mt-[-4px]">
              {import.meta.env.VITE_VERSION}
            </p>
          </div>

        </NavLink>

        <div className="ml-auto flex items-center space-x-4">
          {
            user && (
              <>
                <Button className='flex sm:hidden' size="icon">
                  <Plus />
                </Button>
                <Button className='hidden sm:flex'>
                  <Plus /> <span className='ml-1'>Add Trip</span>
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