import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./country.module.css";
import { motion } from "framer-motion";

let easing = [0.6, -0.05, 0.01, 0.99];

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);

  const country = await res.json();
  return country;
};

const Country = ({ country }) => {
  const [borders, setBorders] = useState([]);

  const getBorders = async () => {
    const borders = await Promise.all(
      country.borders.map((border) => getCountry(border))
    );
    setBorders(borders);
  };

  useEffect(() => {
    getBorders();
  }, []);

  return (
    <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <Layout title={country.name}>
        <div className={styles.container}>
          <div className={styles.container_left}>
            <div className={styles.overview_panel}>
              <img src={country.flag} alt={country.name}></img>

              <h1 className={styles.overview_name}>{country.name}</h1>
              <div className={styles.overview_region}>{country.region}</div>

              <div className={styles.overview_numbers}>
                <div className={styles.overview_population}>
                  <div className={styles.overview_label}>population</div>
                  <div className={styles.overview_value}>
                    {country.population}
                  </div>
                </div>

                <div className={styles.overview_area}>
                  <div className={styles.overview_label}>Area</div>
                  <div className={styles.overview_value}>{country.area}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.container_right}>
            <div>
              <div className={styles.details_panel}>
                <h4 className={styles.details_panel_heading}>Details</h4>

                <div className={styles.details_panel_row}>
                  <div className={styles.details_panel_label}>Capital</div>
                  <div className={styles.details_panel_value}>
                    {country.capital}
                  </div>
                </div>

                <div className={styles.details_panel_row}>
                  <div className={styles.details_panel_label}>Language</div>
                  <div className={styles.details_panel_value}>
                    {country.languages.map(({ name }) => name).join(", ")}
                  </div>
                </div>

                <div className={styles.details_panel_row}>
                  <div className={styles.details_panel_label}>Currency</div>
                  <div className={styles.details_panel_value}>
                    {country.currencies.map(({ name }) => name).join(", ")}
                  </div>
                </div>

                <div className={styles.details_panel_row}>
                  <div className={styles.details_panel_label}>Native Name</div>
                  <div className={styles.details_panel_value}>
                    {country.nativeName}
                  </div>
                </div>

                <div className={styles.details_panel_row}>
                  <div className={styles.details_panel_label}>Subregion</div>
                  <div className={styles.details_panel_value}>
                    {country.subregion}
                  </div>
                </div>

                <div className={styles.details_panel_row}>
                  <div className={styles.details_panel_label}>Gini</div>
                  <div className={styles.details_panel_value}>
                    {country.gini}%
                  </div>
                </div>

                <div>
                  <h1 className={styles.details_panel_borders_label}>
                    N Countries
                  </h1>
                </div>

                <div className={styles.details_panel_borders}>
                  {borders.map(({ flag, name }) => (
                    <div className={styles.details_panel_country}>
                      <img src={flag} alt={name}></img>
                      <div className={styles.details_panel_name}>{name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </motion.div>
  );
};

export default Country;

export const getServerSideProps = async ({ params }) => {
  const country = await getCountry(params.id);

  return {
    props: {
      country,
    },
  };
};
