'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/legacy/image';

const Header = () => {
  const router = useRouter();

  return (
    <header className="row-start-1 flex items-center justify-between gap-4 w-full">
      <Link className="w-12" href="/">
        <Image src="/nasa.png" alt="Logo" width={48} height={48} />
      </Link>
      <Button onClick={() => router.back()}>Back</Button>
    </header>
  );
};

export default Header;
