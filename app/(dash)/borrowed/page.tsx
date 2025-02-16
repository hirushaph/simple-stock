import IssuedProductList from "@/app/_components/IssuedProductList";
import Spinner from "@/app/_components/Spinner";
import { Suspense } from "react";

function Borrowed() {
  return (
    <div className="px-4">
      <h1 className="text-xl font-medium">Issued Items</h1>

      {/* Grid */}
      <Suspense fallback={<Spinner className="mt-6" />}>
        <IssuedProductList />
      </Suspense>
    </div>
  );
}

export default Borrowed;
