import FeedbackBoard from "../../components/FeedbackBoard"
import SortingPanel from "./SortingPanel"

const Suggestions = () => {
  return (
    <>
      <header className="w-full">
        <FeedbackBoard />
        <SortingPanel />
      </header>
      <main className="bg-[#F7F8FD]"></main>
    </>
  )
}

export default Suggestions