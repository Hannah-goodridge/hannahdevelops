import Link from 'next/link';
import { Button } from '@components/index';

export default function NotFound() {
  return (
    <section className="dark:bg-primary text-primary dark:text-white bg-white min-h-screen flex flex-col justify-center items-center px-4">
      <h1 className="text-9xl font-bold text-transparent bg-clip-text text-gradient-right">
        404
      </h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
        Sorry, the page you are looking for does not exist.
      </p>
      <div className="mt-8">
        <Link href="/">
          <Button>
            Go back to Homepage
          </Button>
        </Link>
      </div>
    </section>
  );
}