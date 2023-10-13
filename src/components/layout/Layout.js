import styles from "@/layout/Layout.module.css"
import Header from '@/components/layout/Header';
import Footer from "@/layout/Footer";

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <div className={styles.main}>{children}</div>
            <Footer />
        </>
    );
};

export default Layout;