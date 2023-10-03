import {BiSearchAlt} from 'react-icons/bi'
import '../style/table.css';
export default function SearchBar ({value,handleChange}) {
   return( 
    <div className="divSearch">
        <input
         className="searchBar"
         type="text"
         placeholder="Search here"
         onChange={handleChange}
         value={value} />
         <BiSearchAlt size="30px"/>
    </div>
   );
};

