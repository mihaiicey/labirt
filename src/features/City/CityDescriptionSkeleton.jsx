import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function CityDescriptionSkeleton() {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <Skeleton height={30} />
          <Skeleton count={8} />
        </div>
        <div className="hidden md:block w-1/2">
        <Skeleton height={220}/>
        </div>
      </div>
    </>
  );
}
