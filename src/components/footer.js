import Image from 'next/image'
import dateToString from '../lib/dateToString';
import styles from "../styles/Home.module.css"

const Footer = () => {
  const today = dateToString(new Date());
  return (
    <div>
      <p>{today}</p>
      <p>
        Dibuat oleh:
      </p>
      <p>
        13520037 - M. Akmal Arifin
      </p>
      <p>
        13520067 - Farnas Rozaan I.
      </p>
      <p>
        13520098 - Andika Naufal Hilmy
      </p>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </a>
    </div>
  )
}

export default Footer;
