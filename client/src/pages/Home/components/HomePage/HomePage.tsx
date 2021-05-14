import {
  NewArrivals,
  BestSellers,
  CategoryList,
  SubCategoryList,
} from "./components";

function HomePage() {
  return (
    <div>
      <NewArrivals />
      <BestSellers />
      <CategoryList />
      <SubCategoryList />
    </div>
  );
}

export default HomePage;
