import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "./accordion";

export const NfAbatimentos = () => {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-1"
    >
      <AccordionItem value="item-1" className="border rounded h-max">
        <AccordionTrigger className="px-3">NF 1234567</AccordionTrigger>
        <AccordionContent className="px-3">
          <ul>
            <li className="border border-b-0 border-l-0 border-r-0 p-3">1234568</li>
            <li className="border border-b-0 border-l-0 border-r-0 p-3">1234569</li>
            <li className="border border-b-0 border-l-0 border-r-0 p-3">1234570</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}