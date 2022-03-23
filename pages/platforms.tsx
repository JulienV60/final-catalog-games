import { GetServerSideProps } from "next";
import Link from "next/link";
import Layout from "../components/Layout";
import { getDatabase } from "../src/utils/database";

export const getServerSideProps: GetServerSideProps = async () => {
  const mongodb = await getDatabase();

  const data = await mongodb.db().collection("games").find().toArray();
  const platforms = data.map((element) => {
    return element.platform;
  });

  return {
    props: {
      platforms: platforms,
    },
  };
};
export default function Platforms({ platforms }: any) {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          {platforms.map((element: any, index: number) => {
            return (
              <Link key={(index = 9)} href={`/platforms/${element.name}`}>
                <div className="col-sm-8" style={{ width: "18rem" }}>
                  <div className="card">
                    {element?.platform_logo_url ? (
                      <img
                        src={element.platform_logo_url}
                        style={{ height: "18rem" }}
                        className="card-img-top"
                      />
                    ) : (
                      <img
                        src="..."
                        style={{ height: "18rem" }}
                        className="card-img-top"
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
