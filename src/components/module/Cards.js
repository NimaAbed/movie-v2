import styles from "@/module/Cards.module.css"
import Link from "next/link";

const Cards = ({ coverPhoto, name, about, slug, style = null }) => {
    const image = coverPhoto.url
    return (
        <Link href={`/movie/${slug}`} style={style}>
            <div className={styles.container}>
                <img alt={name} src={image} />
                <div className={styles.text}>
                    {name}
                </div>
                <div className={styles.desc}>{about}</div>
            </div>
        </Link>
    );
};

export default Cards;