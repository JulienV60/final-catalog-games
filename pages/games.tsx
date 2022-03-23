import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import { getDatabase } from "../src/utils/database";
import Link from "next/link";
export const getServerSideProps: GetServerSideProps = async () => {
  const mongodb = await getDatabase();
  const data = await mongodb.db().collection("games").find().toArray();
  const datastring = JSON.stringify(data);

  return {
    props: {
      data: datastring,
    },
  };
};
export default function Games({ data }: any) {
  const datarebuild = JSON.parse(data);
  return (
    <Layout>
      <div className="container">
        <div className="row">
          {datarebuild.map((element: any, index: any) => {
            return (
              <Link key={index} href={`/games/${element.name}`}>
                <div
                  key={index}
                  className="col-sm-8"
                  style={{ maxWidth: "18rem" }}
                >
                  <div className="card">
                    {element?.cover?.url ? (
                      <img
                        src={element.cover.url}
                        style={{ maxHeight: "18rem" }}
                        className="card-img-bottom"
                      />
                    ) : (
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
                        style={{ maxHeight: "18rem" }}
                        className="card-img-bottom"
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{element.name}</h5>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
