import { Button } from "./button";

export const Navbar = () => {
  return (
    <header className="flex items-center justify-center">
      <div className="container p-3 flex justify-between">
        <div>
          <span className="text-3xl font-medium">Abatimentos</span>
        </div>
        <div className="flex flex-col">
          <span>Sud Alimentos</span>
          <span className="text-xs mb-1">43.012.798/5433-00</span>
          <Button
            size='sm'
            variant='destructive'
            className="self-start hover:cursor-pointer"
          >Sair</Button>
        </div>
      </div>
    </header>
  );
}