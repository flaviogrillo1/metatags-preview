import { HomePage } from './home-client';

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  return <HomePage />;
}
