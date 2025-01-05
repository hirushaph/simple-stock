import { Suspense } from "react";
import ProductList from "../_components/ProductList";
import Spinner from "../_components/Spinner";
import { getAvailableStock } from "../_lib/api";

type AvailablePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Available({ searchParams }: AvailablePageProps) {
  const query = (await searchParams).search;

  await getAvailableStock();

  return (
    <div className="px-4">
      <h1 className="text-xl font-medium">Available Items</h1>

      {/* <SearchBar setProducts={setProducts} /> */}

      <Suspense fallback={<Spinner />}>
        <ProductList query={query} />
      </Suspense>
    </div>
  );
}
