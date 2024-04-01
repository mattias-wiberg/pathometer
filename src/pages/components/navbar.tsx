import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { TypographyH3 } from '@/components/ui/typography'
import { MdModeOfTravel } from 'react-icons/md'

const Navbar = () => {
  return (      
  <div className="border-b">
    <div className="flex h-16 items-center px-4">
        <MdModeOfTravel size={32} />
        <TypographyH3 className='ml-2'>Work Travel Tracker</TypographyH3>
        
        <div className="ml-auto flex items-center space-x-4">
          <Button> Login </Button>
          <ModeToggle />
        </div>
    </div>
  </div>
  )
}

export default Navbar