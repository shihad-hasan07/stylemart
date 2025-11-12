import Swipper_Hero from "@/components/Home_components/Swipper_Hero";
import WeeksSale from "@/components/Home_components/WeeksSale"


export default function Home() {
  return (
    <>
      <hr className="opacity-15 mb-3" />
      <div className='container mx-auto px-5 xl:px-20 '>
        <Swipper_Hero></Swipper_Hero>
        <WeeksSale></WeeksSale>
      </div>
    </>
  );
}