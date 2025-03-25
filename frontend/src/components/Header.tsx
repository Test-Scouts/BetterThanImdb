import styles from "./Header.module.css";

interface Props {
  appName: string;
}

function Header({ appName }: Props) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{appName}</h1>
    </header>
  );
}

export default Header;
