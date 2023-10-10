import styles from "@/template/PremiumPage.module.css"
import PremiumCard from '../module/PremiumCard';
import { Toaster } from "react-hot-toast";

const PremiumPage = () => {
    return (
        <>
            <div className={styles.container}>
                <PremiumCard time={30} price={40000} />
                <PremiumCard time={60} price={79000} />
                <PremiumCard time={90} price={115000} />
            </div>
            <Toaster />
        </>
    );
};

export default PremiumPage;