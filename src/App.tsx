import piggyTheBuilder from "@/assets/piggy-the-builder.webp";

function App() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <img src={piggyTheBuilder} alt="Building Piggy" className="w-[300px] animate-pulse" />
        <div className="text-3xl font-bold mt-10">The piggy is building!</div>
        <div className="text-[0.70rem] text-muted-foreground mt-1">
          The website is currently under construction. Please wait for a while.
        </div>
      </div>
    </div >
  )
}

export default App
