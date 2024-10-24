'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

const Header = () => {
  const router = useRouter();

  return (
    <div>
      <Button onClick={() => router.back()}>Back</Button>
    </div>
  );
};

export default Header;
