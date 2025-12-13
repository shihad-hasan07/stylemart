import CategoryGrid from "@/components/Home_components/CategroyGrid";
import SuperDiscount from "@/components/Home_components/SuperDiscount";
import Swipper_Hero from "@/components/Home_components/Swipper_Hero";
import WeeksSale from "@/components/Home_components/WeeksSale"


export default function Home() {
  return (
    <>
      <div className='container mt-3 mx-auto px-5 xl:px-20 '>
        <Swipper_Hero></Swipper_Hero>
        <WeeksSale></WeeksSale>
        <SuperDiscount></SuperDiscount>
        <CategoryGrid></CategoryGrid>
      </div>
    </>
  );
}