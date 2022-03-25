import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import { getDatabase } from "../src/utils/database";

export const getServerSideProps: GetServerSideProps = async () => {
  const mongodb = await getDatabase();
  const data = await mongodb.collection("games").find().toArray();
  const genres = data.map((element: any) => {
    return element.genres;
  });

  const oneArray = genres.join().split(",");
  const filter = oneArray.filter((value, index) => {
    return oneArray.indexOf(value) === index;
  });

  return {
    props: {
      genres: filter,
    },
  };
};
export default function Genres({ genres }: any) {
  return (
    <Layout>
      <section className="py-5">
        <div className="econtainer px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            {" "}
            <h5 className="display-5 fw-bolder"> 🚧Genres In Progress 🚧</h5>
            {genres.map((element: any, index: any) => {
              return (
                <div className="alignement">
                  <h5 className="display-5 fw-bolder">{element}</h5>
                </div>
              );
            })}{" "}
            <h5 className="display-5 fw-bolder"> 🚧Genres In Progress 🚧</h5>
          </div>
        </div>
      </section>
    </Layout>
  );
}
