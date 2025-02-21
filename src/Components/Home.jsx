import {useState, useContext} from "react";// Step 1
import {DataContext} from "../App" //Step 2
export default function Home(){

  const {itemList}=useContext(DataContext); //Step 3
  const [hoveredImage, setHoveredImage] = useState("https://media.officedepot.com/images/f_auto,q_auto,e_sharpen,h_450/products/9942929/9942929");

    return(
        <div className="row">
        <div className="column bg-amber-100 h-[120vh]"><h1 class="headertext">Items: </h1>
        <ul>{itemList.map(((items,index)=> 
          <li id="itemsdisplay" onMouseEnter={() => setHoveredImage(itemList[index].link)} key={index}> 
          {items.item}</li>))}
        </ul>
        </div>

        <div className="column bg-gray-50 h-[120vh]"><h1>Column 2</h1>
        <img src={hoveredImage} alt="Hovered Image" class="center"/>
        </div>
      </div> 
    )
            
    
    
    }