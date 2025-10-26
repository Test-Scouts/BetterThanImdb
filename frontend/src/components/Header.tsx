interface Props {
  appName: string;
}

function Header({ appName }: Props) {
  return (
    <header className="fixed top-0 left-0 w-full bg-purple-950/100 backdrop-blur-lg border-b border-purple-500/10 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <h1 className="text-3xl font-thin text-orange-100 tracking-[-0.02em]">{appName}</h1>
      </div>
    </header>
  );
}

export default Header;
