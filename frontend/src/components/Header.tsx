interface Props {
  appName: String;
}

function Header({ appName }: Props) {
  return <h1>{appName}</h1>;
}

export default Header;
