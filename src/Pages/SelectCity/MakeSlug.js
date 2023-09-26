
import cityList from "../../JsonFiles/Cities.json"

const MakeSlug = () => {
    var f2f = require('f2f');
    var FFF = new f2f();

    const arr = [];

    function removeDuplicates(arr) {
        return arr.filter((item,
            index) => arr.indexOf(item) === index);
    }

    const newObj = cityList.map((city)=>{
        return {...city,slug: FFF.simplef2f(city.name)}
    })
    console.log(newObj);

    return (
        <>
            {JSON.stringify(newObj)}
        </>
    );
}

export default MakeSlug;