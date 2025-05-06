import ContasReceberClient from './ContasReceberClient';

export async function generateStaticParams() {
  return [
    { type: 'ativos' },
    { type: 'inativos' }
  ];
}

export default function Page({ params }) {
  return <ContasReceberClient type={params.type} />;
}
