import Categories from "@/components/categories/Categories";
import CategoriesDetails from "@/components/categoriesDetails/CategoriesDetails";


export default function Home() {
  return (
    <main className="flex h-full-screen flex-col items-center justify-between p-16 bg-black">
      <div className="w-11/12">

      <Categories />
      <CategoriesDetails />
      </div>
      
    </main>
  );
}
