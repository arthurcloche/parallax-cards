import Card from "../components/Card";
import { useEffect, useRef } from "react";

export const meta = () => {
  return [
    { title: "Parallax Cards" },
    { name: "description", content: "Parallax Cards" },
  ];
};

export default function Index() {
  const container = useRef(null);

  useEffect(() => {
    const initGSAP = async () => {
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: container.current,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            container.current.progress = self.progress;
          },
        });
      });

      return ctx;
    };

    let ctx;
    initGSAP().then((context) => {
      ctx = context;
    });

    return () => ctx?.revert();
  }, []);

  return (
    <main ref={container} className="relative">
      {cards.map((card, i) => {
        const targetScale = 1 - (cards.length - i) * 0.05;
        return (
          <Card
            key={`c_${i}`}
            i={i}
            {...card}
            progress={() => container.current?.progress || 0}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </main>
  );
}

export const cards = [
  {
    title: "Pick Your Product",
    description:
      "Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.",
    src: "rock.jpg",
    link: "https://www.ignant.com/2023/03/25/ad2186-matthias-leidingers-photographic-exploration-of-awe-and-wonder/",
    color: "#A3E3B8",
  },
  {
    title: "Build Your Brand",
    description:
      "This is a story on the border between reality and imaginary, about the contradictory feelings that the insularity of a rocky, arid, and wild territory provokes”—so French photographer Clément Chapillon describes his latest highly captivating project Les rochers fauves (French for ‘The tawny rocks’).",
    src: "tree.jpg",
    link: "https://www.ignant.com/2022/09/30/clement-chapillon-questions-geographical-and-mental-isolation-with-les-rochers-fauves/",
    color: "#D4F9E0",
  },
  {
    title: "Sell Online and Offline",
    description:
      "Though he views photography as a medium for storytelling, Zissou’s images don’t insist on a narrative. Both crisp and ethereal, they’re encoded with an ambiguity—a certain tension—that lets the viewer find their own story within them.",
    src: "water.jpg",
    link: "https://www.ignant.com/2023/10/28/capturing-balis-many-faces-zissou-documents-the-sacred-and-the-mundane-of-a-fragile-island/",
    color: "#DDFF9E",
  },
];
