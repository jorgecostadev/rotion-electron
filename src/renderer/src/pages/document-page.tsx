import { ToC } from '../components/ToC';

export function DocumentPage() {
  return (
    <main className="flex flex-1 gap-8 p-10 py-12">
      <aside className="hidden lg:block top-0 sticky">
        <span className="font-semibold text-rotion-300 text-xs">TABLE OF CONTENTS</span>

        <ToC.Root>
          <ToC.Link>Back-end</ToC.Link>
          <ToC.Section>
            <ToC.Link>Banco de Dados</ToC.Link>
            <ToC.Link>Autenticação</ToC.Link>
          </ToC.Section>
        </ToC.Root>
      </aside>

      <section className="flex flex-col flex-1 items-center">asfafd</section>
    </main>
  );
}
