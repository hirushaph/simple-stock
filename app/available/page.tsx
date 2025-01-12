import { Suspense } from "react";
import ProductList from "../_components/ProductList";
import Spinner from "../_components/Spinner";
import { getAvailableStock } from "../_lib/api";
import SearchBar from "../_components/SearchBar";

type AvailablePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Available({ searchParams }: AvailablePageProps) {
  const params = await searchParams;
  const query = Array.isArray(params.search)
    ? params.search.join(",")
    : params.search || "";

  console.log(query);

  return (
    <div className="px-4">
      <h1 className="text-xl font-medium">Available Items</h1>

      <SearchBar />

      <Suspense fallback={<Spinner />} key={query}>
        <ProductList query={query} />
      </Suspense>
    </div>
  );
}
