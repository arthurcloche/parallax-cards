import Card from "../components/Card/mockCard";
import CardContext from "../contexts/CardContext";

export default function Index() {
  return (
    <CardContext.Provider value={{ a: 0 }}>
      <main className="flex flex-col items-center justify-center">
        {[...Array(3)].map((_, i) => {
          return <Card key={`c_${i}`} i={i} />;
        })}
      </main>
    </CardContext.Provider>
  );
}
