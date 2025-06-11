import Table from "./TableComponent";
import AxiosComponent from "./AxiosComponent";

function App(){
    let info = [
        ["Adam", "23", "M"],
        ["Mark","45","M"],
        ["Anna","99","F"],
    ];
  return (
    <div>
      <h1>User Info</h1>


      
      <Table info={info}/>
      <AxiosComponent/>
    </div>
  );
}

export default App;