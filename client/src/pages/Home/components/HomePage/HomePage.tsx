import { NewArrivals, BestSellers } from "./components";

function HomePage() {
  // if (loading) return <Spinner />;

  return (
    <div>
      <NewArrivals />
      <BestSellers />
    </div>
  );
}

export default HomePage;
