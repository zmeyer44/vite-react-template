export function Footer() {
  return (
    <div className="bg-gray-100 text-gray-800 p-6 flex justify-center items-center">
      <div className="flex items-center gap-2 text-sm justify-between w-full">
        <a
          href="https://blastoff.org/?utm_source=blastoff-project"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline"
        >
          <span className="text-gray-600">Built with</span>
          <div className="flex items-center gap-1">
            <span className="text-gray-900 font-bold">Blastoff</span>
            <img src="/logo.svg" alt="Blastoff" className="h-6 w-auto" />
          </div>
        </a>
        <div className="">
          <img src="/logo.svg" alt="Blastoff" className="h-6 w-auto" />
        </div>
      </div>
    </div>
  );
}
