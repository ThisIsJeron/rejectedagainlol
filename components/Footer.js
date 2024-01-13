import styles from './Footer.module.css'

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <p>Made with love by <a href="https://x.com/jackedtechbro" style={{ color: 'blue' }}>@jackedtechbro</a> with help from ChatGPT</p>
      </footer>
    </>
  )
}