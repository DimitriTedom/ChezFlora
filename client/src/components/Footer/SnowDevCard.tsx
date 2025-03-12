import { SiGmail } from "react-icons/si"; 
import { BsLinkedin } from "react-icons/bs"; 
import { AiFillGithub } from "react-icons/ai"; 
import { CalendarIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export function SnowDevCard() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <h1 className="text-blue-400">@SnowDev</h1>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="/avatar1.png" />
            <AvatarFallback>SN</AvatarFallback>
          </Avatar>
          <div className="space-y-1 flex-col flex items-center">
            <h4 className="text-sm font-semibold">Web Delopper & Designer</h4>
            <p className="text-sm">
              tags: MERN Stack Developper, Graphic, & UI/UX Designer
            </p>
            <p className="text-sm text-pink-700 flex space-x-2">
                <a href="https://github.com/DimitriTedom"><AiFillGithub /></a>
                <a href="https://github.com/DimitriTedom"><BsLinkedin /></a>
                <a href="mailto:dimitritedom@gmail.com"><SiGmail /></a>
            </p>
            <div className="flex items-center pt-2">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Published March 22
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
