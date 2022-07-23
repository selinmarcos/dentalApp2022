import Odontogram from "./odontogram/Odontogram";
import dataInsertar from "../../constants/dataOdontogramInsertar";
const Drugs = () => {
    return ( 
        <div>
            {/* <h1>lista de medicamentos</h1> */}
            <Odontogram  estadoPrueba={dataInsertar}/>
        </div>
     );
}
 
export default Drugs;