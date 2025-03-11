import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { ButtonIcon } from './ButtonImage';

const PopoverCustum = () => {

    return (
        <Popover>
            <PopoverTrigger>
               <ButtonIcon />
            </PopoverTrigger>
            <PopoverContent className={'flex items-center self-start absolute right-0 lg:w-[35rem] lg:h-[3.5rem]  rounded-full p-0 border-pink-400'}>
                <Input
                    type="text"
                    placeholder="Type and press enter"
                    className="w-full h-full rounded-full border-pink-400 px-[1.5rem] lg:text-2xl"
                />
            </PopoverContent>
        </Popover>
    );
};

export default PopoverCustum;
