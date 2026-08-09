import styles from "./ColumnGrid.module.css";

/**
 * Left + right content-edge guides only (no inner column lines).
 * Aligns with the container rail — behind content, full viewport height.
 */
export default function ColumnGrid() {
  return (
    <div className={styles.overlay} aria-hidden="true">
      <div className={styles.rail}>
        <div className={`${styles.vline} ${styles.vlineLeft}`} />
        <div className={`${styles.vline} ${styles.vlineRight}`} />
      </div>
    </div>
  );
}
