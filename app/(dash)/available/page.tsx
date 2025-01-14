import { Suspense } from "react";
import ProductList from "../../_components/ProductList";
import Spinner from "../../_components/Spinner";
import SearchBar from "../../_components/SearchBar";
import Modal from "../../_components/Modal";
import { cookies } from "next/headers";

type AvailablePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Available({ searchParams }: AvailablePageProps) {
  const sessionCookie = (await cookies()).get("session");
  const params = await searchParams;
  const query = Array.isArray(params.search)
    ? params.search.join(",")
    : params.search || "";

  console.log(query);

  return (
    <div className="px-4">
      <h1 className="text-xl font-medium">Available Items</h1>

      <SearchBar />

      {/* <Modal /> */}

      <Suspense fallback={<Spinner className="mt-6" />} key={query}>
        <ProductList query={query} sessionCookie={sessionCookie} />
      </Suspense>
    </div>
  );
}
