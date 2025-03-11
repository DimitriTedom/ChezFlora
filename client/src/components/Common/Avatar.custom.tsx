import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export  function AvatarCustum() {
  return (
    <Avatar>
      <AvatarImage src="/avatar1.png" alt="avatar" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
