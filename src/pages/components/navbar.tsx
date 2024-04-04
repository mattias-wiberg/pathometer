import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { TypographyH3, TypographyP } from '@/components/ui/typography'
import { useAuth } from '@/context/AuthContext'
import { auth } from '@/firebase'
import { signOut } from 'firebase/auth'
import { MdModeOfTravel } from 'react-icons/md'
import { NavLink, useNavigate } from 'react-router-dom'
import { IoEnterOutline, IoExitOutline } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate()
  const user = useAuth()

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <NavLink to='/' className='flex items-center space-x-2'>
          <MdModeOfTravel size={32} />
          <TypographyH3 className='ml-2'>Work Travel Tracker</TypographyH3>
        </NavLink>

        <div className="ml-auto flex items-center space-x-4">
          {
            user ? (
              <>
                <TypographyP>{user.email}</TypographyP>
                <Button onClick={() => signOut(auth)}>Exit<IoExitOutline className='ml-2' /></Button>
              </>
            ) : (
              <>
                <Button onClick={() => navigate('/auth')}>Enter<IoEnterOutline className='ml-2' /></Button>
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