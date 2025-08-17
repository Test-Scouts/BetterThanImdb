interface Props {
  appName: string;
}

function Header({ appName }: Props) {
  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 shadow-lg p-4 z-50">
      <h1 className="text-2xl font-bold text-white tracking-wide">{appName}</h1>
    </header>
  );
}

export default Header;
