import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserAvatar({
  name,
  image,
}: {
  name: string;
  image?: string;
}) {
  console.log(image);
  return (
    <Avatar>
      <AvatarImage src={`${image}`} />
      <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>
  );
}
