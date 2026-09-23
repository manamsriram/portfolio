import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomCursor } from "@/components/CustomCursor";
import { useLenis } from "@/hooks/useLenis";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => {
  useLenis();

  return (
    <>
      <CustomCursor />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
