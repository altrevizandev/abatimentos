import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { NfAbatimentos } from "@/components/ui/nfAbatimentos"
import { TotalAbatimentos } from "@/components/ui/totalAbatimentos"

export default function Homepage() {
  return (
    <div className="flex flex-col gap-y-10">
      <div
        className="
          items-center
        "
      >
        <TotalAbatimentos total={0} />
      </div>
      <div
        className="flex flex-col gap-3"
      >
        <div
          className="flex gap-3 flex-col"
        >
          <span className="text-2xl font-medium">Abatimentos possíveis para 43.012.798/5433-00</span>
          <Field orientation="horizontal" className="max-w-96">
            <Input type="search" placeholder="Buscar NF de referencia..." />
            <Button>Buscar</Button>
          </Field>
        </div>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          <NfAbatimentos />
          <NfAbatimentos />
          <NfAbatimentos />
          <NfAbatimentos />
          <NfAbatimentos />
          <NfAbatimentos />
          <NfAbatimentos />
          <NfAbatimentos />
          <NfAbatimentos />
          <NfAbatimentos />
        </div>
      </div>
    </div>
  );
}
