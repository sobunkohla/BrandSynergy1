import { cn } from "@/lib/utils";

interface Heading {
  title: string;
  description: string;
  icon: any;
  iconColor?: string;
  bgColor?: string;
}

function Heading({
  title,
  description,
  icon: Icon,
  iconColor,
  bgColor,
}: Heading) {
  return (
    <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
      <div className={cn("p-2 w-fit rounded-md", bgColor)}>
        <Icon className={cn("w-10 h-10", iconColor)} />
      </div>
      <div>
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}

export default Heading;
