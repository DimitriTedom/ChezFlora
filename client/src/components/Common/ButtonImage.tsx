import { BsSearch } from "react-icons/bs"; 
import { Button } from '@/components/ui/button';

export function ButtonIcon() {
  

  return (
    <Button 
      variant="outline" 
      className="w-11 h-11 rounded-full border-pink-300"
    >
     <BsSearch className='w-15 h-15 text-pink-700'/>
    </Button>
  );
}
