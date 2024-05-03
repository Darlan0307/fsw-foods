import { Skeleton } from "@/app/_components/ui/skeleton";

const AnimateLoader = () => {
  return (
    <div className="grid grid-cols-3 gap-5 p-5">
      {Array.from({ length: 9 }).map((_, index) => (
        <div className="justify-self-center" key={index}>
          <Skeleton className="h-[100px] w-[100px] rounded-md bg-muted-foreground" />
        </div>
      ))}
    </div>
  );
};

export default AnimateLoader;
