import Head from "next/head";
import Link from "next/link";
import styles from "./Layout.module.css";

const Layout = ({ children, title = "Worlds" }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Link href="/">World Countries</Link>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>Mohammed Amjed @moe_amjed</footer>
    </div>
  );
};

export default Layout;
