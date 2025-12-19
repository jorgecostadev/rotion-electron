import { Link } from 'react-router-dom';

export function BlankPage() {
  return (
    <main className="flex flex-1 justify-center items-center text-rotion-400">
      <Link to="/document">Selecione ou crie um documento</Link>
    </main>
  );
}
