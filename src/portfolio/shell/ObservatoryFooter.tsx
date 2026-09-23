import styles from './Shell.module.css'

export function ObservatoryFooter() {
  return <footer className={styles.footer} data-testid="observatory-footer">
    <p>Tran Gia Minh Tam · scientific portfolio</p>
    <p className={styles.footerSequence} aria-hidden="true">5′—ATCG—DATA—FIELD—DISCOVERY—3′</p>
  </footer>
}

