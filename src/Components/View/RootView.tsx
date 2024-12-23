import Table from "../Body/Table/Table";
import Footer from "../Footer/Footer";
import Forms from "../Forms/Forms";
import Header from "../Header/Header";

const RootView = () => {
  return (
    <div>
      <Header />

      <Forms />
      <Table />
      <Footer />
    </div>
  );
};
export default RootView;
