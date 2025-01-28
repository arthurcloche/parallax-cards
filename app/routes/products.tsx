import Product from "../components/Products";
import { useState, useEffect } from "react";
import { GUI } from "lil-gui";
const products = ["basketball", "chocolate", "cap"];
export default function Index() {
  const [selected, setSelected] = useState("basketball");
  useEffect(() => {
    const gui = new GUI();
    gui
      .add({ product: selected }, "product", products)
      .name("Products")
      .onChange((value: string) => {
        setSelected(value);
      });
    return () => gui.destroy();
  }, []);

  return (
    <main className="bg-[#4a4a4a]">
      <div className="flex items-center justify-center h-full">
        <h2 className="text-white text-[200px] font-bold">Products</h2>
      </div>

      <div className="flex flex-row h-full">
        <div className="w-full h-full">
          <Product
            className="w-full h-full flex align-middle justify-center"
            selected={selected}
            animated={false}
            //   colorScheme={colorScheme}
          />
        </div>
      </div>
    </main>
  );
}
