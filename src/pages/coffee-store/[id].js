import { useRouter } from "next/router";
import Link from "next/link";
// import coffeeStoresData from "../../../data/coffee-stores.json";
import cls from "classnames";

import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/coffee-store.module.css";
import { FetchCoffeeStoreApi } from "../../../lib/coffee-store-api";

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  const coffeeStoresData = await FetchCoffeeStoreApi();
  console.log(FetchCoffeeStoreApi, "API");
  return {
    props: {
      CoffeeStore: coffeeStoresData.find((CoffeeStore) => {
        return CoffeeStore.id.toString() === params.id; //dynamic id
      }),
    },
  };
}

export async function getStaticPaths() {
  const coffeeStoresData = await FetchCoffeeStoreApi();
  const paths = coffeeStoresData.map((CoffeeStore) => {
    return {
      params: {
        id: CoffeeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { address, name, imgUrl, locality } = props.CoffeeStore;
  const handleUpvoteButton = () => {
    console.log("handle upvote");
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/" legacyBehavior>
              <a>👈 Back to Home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={imgUrl}
            width={300}
            height={100}
            className={styles.storeImg}
            alt={name}
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          {address && (
            <div className={styles.iconWrapper}>
              <Image src="/icons/places.svg" width="24" height="24" />
              <p className={styles.text}>{address}</p>
            </div>
          )}
          {locality && (
            <div className={styles.iconWrapper}>
              <Image src="/icons/nearMe.svg" width="24" height="24" />
              <p className={styles.text}>{locality}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image src="/icons/star.svg" width="24" height="24" />
            <p className={styles.text}>12</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up Vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
