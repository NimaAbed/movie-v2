import styles from "@/layout/Layout.module.css"
import Header from '@/components/layout/Header';

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <div className={styles.main}>{children}</div>
        </>
    );
};

export default Layout;