import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
 
const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}
 
export function DefaultAccordion() {
  const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => setOpen(open === value ? 
    0
    : value);
 
  return (
    <>
      <Accordion open={open === 1} animate={CUSTOM_ANIMATION} icon={<Icon id={1}  open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1) } className={`px-5 my-[2px] transition-colors text-lg bg-gray-200 hover:bg-purple-600 hover:text-white ${
            open === 1 ? " bg-purple-600 text-white" : ""
          }`}>How can I register on the website?</AccordionHeader>
        <AccordionBody className="text-base font-normal px-5">
        To register, click on the "Register" button and fill out the required information on the registration form.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} animate={CUSTOM_ANIMATION} icon={<Icon id={2} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(2)} className={`px-5  my-[2px] transition-colors text-lg bg-gray-200 hover:bg-purple-600 hover:text-white ${
            open === 2 ? " bg-purple-600 text-white" : ""
          }`}>
        How can I see all the assignments created by other students?
        </AccordionHeader>
        <AccordionBody className="text-base font-normal px-5">
        Visit the "All Assignments" page to see a list of all assignments submitted by other students.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} animate={CUSTOM_ANIMATION} icon={<Icon id={3} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(3)} className={`px-5  my-[2px] transition-colors text-lg bg-gray-200 hover:bg-purple-600 hover:text-white ${
            open === 3 ? " bg-purple-600 text-white" : ""
          }`}>
        Can I filter assignments based on a specific category or Difficulty level?
        </AccordionHeader>
        <AccordionBody className="text-base font-normal px-5">
        Yes, you can use the filter options on the " All Assignments" page to narrow down assignments based on the difficulty level.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 4} animate={CUSTOM_ANIMATION} icon={<Icon id={4} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(4)} className={`px-5  my-[2px] transition-colors text-lg bg-gray-200 hover:bg-purple-600 hover:text-white ${
            open === 4 ? " bg-purple-600 text-white" : ""
          }`}>
        How do I submit an assignment?
        </AccordionHeader>
        <AccordionBody className="text-base font-normal px-5">
        Click on the assignment title, and you will find a "Take Assignment" button on the assignment details page. Follow the prompts to upload your assignment file.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 5} animate={CUSTOM_ANIMATION} icon={<Icon id={5} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(5)} className={`px-5  my-[2px] transition-colors text-lg bg-gray-200 hover:bg-purple-600 hover:text-white ${
            open === 5 ? " bg-purple-600 text-white" : ""
          }`}>
        How can I check my assignment marks?
        </AccordionHeader>
        <AccordionBody className="text-base font-normal px-5">
        Navigate to the "My Grades" section to view your assignment marks. Grades are typically available shortly after the submission deadline.
        </AccordionBody>
      </Accordion>
    </>
  );
}