import Layout from "../components/Layout";
import SearchPage from "./search/page";
export default async function Home() {
  return (
    <Layout>
      <SearchPage />
    </Layout>
  );
}
