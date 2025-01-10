import { Button } from "@/components/ui/button";
import Image from "next/image";

interface SSOButtonProps {
  name: string;
  icon: string;
  onClick: () => void;
}

export function SSOButton({ name, icon, onClick }: SSOButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={onClick}
    >
      <Image
        src={icon}
        alt={`${name} logo`}
        width={20}
        height={20}
        className="mr-2"
      />
      Continue with {name}
    </Button>
  );
}