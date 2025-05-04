import { Route, Routes } from "react-router-dom";
import Regions from "./Regions.jsx";
import AddRegion from "./AddRegion.jsx";
import RegionSinglePage from "./RegionSinglePage.jsx";

export default function Admin() {
  return (
    <Routes>
      <Route index element={<Regions />} />
      <Route path="/addRegion" element={<AddRegion />} />
      <Route path="/regionInfo/:id" element={<RegionSinglePage />} />
    </Routes>
  );
}
