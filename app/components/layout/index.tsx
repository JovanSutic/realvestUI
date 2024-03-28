import styles from "./styles.module.css";

type ColumnSizeType = 1 | 2 | 3;

export const Page = ({ children }: { children: JSX.Element }) => {
  return <div className={styles.pageWrapper}><div className={styles.page}>{children}</div></div>;
};

export const Line = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return <div className={styles.line}>{children}</div>;
};

export const Column = ({
  children,
  size,
}: {
  children: JSX.Element | JSX.Element[];
  size: ColumnSizeType;
}) => {
    const setColumnStyle = () => {
        if (size === 1) return `${styles.column} ${styles.column1}`;
        if (size === 2) return `${styles.column} ${styles.column2}`;
        `${styles.column} ${styles.column3}`;
    }
  return <div className={setColumnStyle()}>{children}</div>;
};

export const WidgetWrapper = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <div className={styles.widget}>{children}</div>
  )
}