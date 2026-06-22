import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "./accordion";
import { Field } from "./field";
import { Checkbox } from "./checkbox";
import { Label } from "./label";
import { TitulosType } from "@/app/page";

export const Titulo = ({
  titulo,
  selectTitulos
}: {
  titulo: TitulosType,
  selectTitulos: (titulos: TitulosType) => void
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-1"
    >
      <AccordionItem value="item-1" className="border rounded h-max">
        <AccordionTrigger className="px-3">NF {titulo.numero}</AccordionTrigger>
        <AccordionContent className="px-3">
          {titulo.parcelas.map((parcela) => (
            <Field key={parcela.id} orientation='horizontal'>
              <Checkbox
                id={`nf-${parcela.id}-checkbox`}
                name={`nf-${parcela.id}-checkbox`}
                onCheckedChange={() => {
                  selectTitulos(titulo);
                }}
              />
              <Label htmlFor={`nf-${parcela.id}-checkbox`}>{parcela.descricao} - R$ {parcela.valor}</Label>
            </Field>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

//300 dols p/ mes