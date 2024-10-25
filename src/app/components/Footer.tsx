import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const Footer = () => (
  <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center pt-4">
    <Avatar>
      <AvatarImage src="/avatar.jpeg" alt="Daniil Suleiman" />
      <AvatarFallback>DS</AvatarFallback>
    </Avatar>
    <p className="text-sm text-center text-gray-500">
      Daniil Suleiman &copy; {new Date().getFullYear()}
    </p>
    <div className="flex gap-4">
      <Link href="https://github.com/sulemanof" target="_blank" rel="noreferrer">
        <GitHubLogoIcon width={24} height={24} aria-label="GitHub" />
      </Link>
      <Link href="https://www.linkedin.com/in/sulemanof/" target="_blank" rel="noreferrer">
        <LinkedInLogoIcon width={24} height={24} aria-label="LinkedIn" />
      </Link>
    </div>
  </footer>
);

export default Footer;
