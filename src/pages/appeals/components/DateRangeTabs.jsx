import { addWeeks, subWeeks } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import TabsController from "./TabsController.jsx";

const DateRangeTabs = ({ setFormData, formData }) => {
  const shiftRange = (direction) => {
    const stepFnMap = direction === "next" ? addWeeks : subWeeks;
    setFormData((prevRange) => ({
      fromDate: stepFnMap(prevRange.fromDate, 1),
      toDate: stepFnMap(prevRange.toDate, 1),
    }));
  };

  return (
    <>
      <TabsController
        formData={formData}
        setFormData={setFormData}
        shiftRange={shiftRange}
      />
    </>
  );
};

export default DateRangeTabs;
