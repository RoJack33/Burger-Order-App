import useHttp from "../hooks/useHttp.js";
import MealItem from "./MealItem.jsx";
import Error from './Error.jsx';

const requestConfig = {};

export default function Meals (){
  // const [loadedMeals, setLoadedMeals] = useState([]);
  // const [isFetching, setIsFetching] = useState(false);

  //storing data in state because it take sometime to fully loaded, the first render will display empty becoz havent finish loading
  //useEffect is implemented hhere instead of fetchMeals() because fetch meal will update the state, which will re-render everytime
  // useEffect(()=>{  
  //   async function fetchMeals (){
  //     setIsFetching(true)
  //     const response = await fetch("http://localhost:3000/meals");
      
  //     if(!response.ok) {
  //       throw new Error('Could not fetch orders!')
  //     }
  //     const meals = await response.json();

  //     setLoadedMeals(meals);  

  //   }

  //   fetchMeals();
  // },[])

  const {data: loadedMeals, isLoading, error} = useHttp("http://localhost:3000/meals", requestConfig, []);

  if(isLoading) {
    return<p className="center">Fetching meals</p>
  }

  if(error) {
    return <Error title="Failed to fetch meals" mesasage={error} />
  }

  return(
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal}/>
      ))}
    </ul>
  )
}