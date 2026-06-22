'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { TotalAbatimentos } from "@/components/ui/totalAbatimentos";

import NfsData from '@/app/_mock/nfs_ref.json';
import TitulosData from '@/app/_mock/titulos.json';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useEffect, useMemo, useState } from "react";
import { TotalAbatimentosSelecionados } from "@/components/ui/totalAbatimentosSelecionados";
import { TotalAbatimentosSelecionadosPorNf } from "@/components/ui/totalAbatimentosSelecionadosPorNf";
import { Titulo } from "@/components/ui/titulo";

type NfType = {
    numero: string;
    serie: string;
    dataEmissao: string;
    valorBruto: number;
    valorAbatimentos: number;
    valorLiquido: number;
    status: string;
    abatimentos: {
        id: number;
        tipo: string;
        descricao: string;
        valor: number;
        status: string;
    }[];
};

export type TitulosType = {
    numero: number;
    parcelas: {
        id: number,
        validade: string;
        descricao: string;
        valor: number;
    }[];
};

export default function Homepage() {
  const [total, setTotal] = useState(0);
  const [totalSelecionadoParaAbater, setTotalSelecionadoParaAbater] = useState(0);
  const [nfs, setNfs] = useState<NfType[]>(NfsData.notas ?? []);
  const [titulos, setTitulos] = useState<TitulosType[]>([]);
  const [nfsSelected, setNfsSelected] = useState<NfType[]>([]);
  const [titulosSelected, setTitulosSelected] = useState<TitulosType[]>([]);
  
  useEffect(() => {
    async function loadAbatimentos() {
      setTitulos(TitulosData.titulos);

      let somaTotal = nfs.reduce((prev, nf) => {
        return prev + nf.valorLiquido;
      }, 0);

      setTotal(somaTotal);
    }

    loadAbatimentos();
  }, []);

  const selectNfs = (nf: NfType) => {
    if (nfsSelected.includes(nf)) {
      setNfsSelected((prev) => prev.filter(prevNf => prevNf.numero != nf.numero));
    } else {
      setNfsSelected((prev) => [ ...prev, nf ]);
    }
  }

  const selectTitulos = (titulo: TitulosType) => {
    if (titulosSelected.includes(titulo)) {
      setTitulosSelected((prev) => prev.filter(prevAbatimento => prevAbatimento.numero != titulo.numero));
    } else {
      setTitulosSelected((prev) => [ ...prev, titulo ]);
    }
  }

  const totalEmAbatimentosSelecionadosPorNfRef = useMemo(() => {    
    let soma = 0;
    
    if (nfsSelected.length > 0) {
      soma = nfsSelected.reduce((prev, curr) => {
        return prev + curr.valorLiquido;
      }, 0);
    
      setTotalSelecionadoParaAbater(soma);
    } else {
      setTotalSelecionadoParaAbater(0);
    }

    return <TotalAbatimentosSelecionadosPorNf total={soma} />;
  }, [ nfsSelected ]);
  
  const totalEmAbatimentosSelecionados = useMemo(() => {
    let soma = 0;

    if (nfsSelected.length == 0) {
      if (titulosSelected.length > 0) {
        setTitulosSelected([]);
      }
    } else {
      soma = titulosSelected.reduce((prev, curr) => {
        return curr.parcelas.reduce((prevParc, currParc) => {
          return prev + currParc.valor;
        }, 0);
      }, 0);
    }

    return <TotalAbatimentosSelecionados totalSelecionado={soma} total={totalSelecionadoParaAbater} />
  }, [ titulosSelected, totalSelecionadoParaAbater ]);

  return (
    <div className="flex flex-col gap-y-10">
      <div
        className="
          grid
          gap-3
          grid-cols-1
          md:grid-cols-3
        "
      >
        <TotalAbatimentos total={total} />
        {totalEmAbatimentosSelecionadosPorNfRef}
        {totalEmAbatimentosSelecionados}
      </div>
      <div
        className="flex flex-col gap-3"
      >
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
          <Card className="h-max">
            <CardContent className="flex flex-col gap-3">
              <span className="font-medium text-lg">NFs de Devolução Lançadas</span>
              <Field orientation="horizontal" className="mb-3 self-start md:max-w-96">
                <Input type="search" placeholder="Buscar NF de referencia..." />
                <Button>Buscar</Button>
              </Field>
              <div className="p-3 flex flex-col gap-3">
                {nfs.map((data) => (
                  <Field key={data.numero} orientation='horizontal'>
                    <Checkbox
                      id={`nf-${data.numero}-checkbox`}
                      name={`nf-${data.numero}-checkbox`}
                      onCheckedChange={(checked) => {
                        selectNfs(data);
                      }}
                    />
                    <Label htmlFor={`nf-${data.numero}-checkbox`}>{data.numero}</Label>
                  </Field>
                ))}
              </div>
            </CardContent>
          </Card>
          {nfsSelected.length > 0 && (
            <Card>
              <CardContent className="flex gap-3 flex-col">
                <span className="font-medium text-lg">Saldo devedor - Titulos</span>
                {titulos.map((titulo) => (
                  <Titulo
                    key={titulo.numero}
                    titulo={titulo}
                    selectTitulos={selectTitulos}
                  />
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
