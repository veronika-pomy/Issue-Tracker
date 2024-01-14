import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <div>
      <Pagination itemCount={100} itemsPerPage={10} currentPage={1}/>
    </div>
  )
}
