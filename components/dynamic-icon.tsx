import * as Icons from "lucide-react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
}

export const DynamicIcon = ({ name, className, ...props }: IconProps) => {
  const LucideIcon = (Icons as any)[name];

  if (!LucideIcon) {
    return <Icons.HelpCircle className={className} {...props} />;
  }

  return <LucideIcon className={className} {...props} />;
};

