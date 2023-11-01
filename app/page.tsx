import Categories from "@/components/common/Categories";
import MobileNav from "@/components/common/MobileNav";
import Navbar from "@/components/common/Navbar";
import Toast from "@/components/common/Toast";

export default async function Home() {
  
  return (
  <div>
    <Toast />
    <Navbar />
   
    <Categories />
  </div>
  )
}
