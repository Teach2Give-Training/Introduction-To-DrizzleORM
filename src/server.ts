// console.log("hello ts")
import db from "./drizzle/db"
import { stateTable } from "./drizzle/schema"

//Insert Into StateTable

async function insertState(stateName:string, stateCode:string){
    try {
        const result = await db.insert(stateTable).values({stateName,stateCode}).returning(); 
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error inserting state", error);
        throw error;
    }
}


// const getStates = async () =>{
//     return await db.query.stateTable.findMany()
// }

// const getCities = async () =>{
//     return await db.query.cityTable.findMany()
// }

const getCitiesWithItState = async () =>{
    return await db.query.cityTable.findMany({
        with:{
           state:{
            columns:{
                stateName:true,
                stateCode:true
            }
           }
        }
    })
}

const getRestaurants = async ()=>{
    return await db.query.restaurantTable.findMany()
}

const getRestaurantsWithItCity = async ()=>{
    return await db.query.restaurantTable.findMany({
        with:{
            cities:{
                columns:{
                    cityName:true
                }                
            }
        }
    })
}

const getRestaurantsOwners = async () =>{
    return await db.query.restaurantOwnerTable.findMany()
}

const getRestaurantsOwnersWithItsDetails = async () =>{
    return await db.query.restaurantOwnerTable.findMany({
        with:{
            user: {
                columns:{
                    userId:true,
                    fullName:true,
                    email:true
                }
            },
            restaurant: {
                columns:{
                    restaurantName:true,
                    streetAddress:true
                }
            }
        }
    })
}

async function main() {
    //states
    // const States = await getStates()
    // console.log("🚀 ~ main ~ States:", States)
    // cities
    // const Cities = await getCities()
    // console.log("🚀 ~ main ~ Cities:", Cities)


    // const results = await getCitiesWithItState();
    // console.log("State with States: ", results)

    // const restaurants =await getRestaurants()
    // console.log("🚀 ~ main ~ restaurants:", restaurants)

    // const restaurantWithCity = await getRestaurantsWithItCity()
    // console.log("🚀 ~ main ~ restaurantWithCity:", restaurantWithCity)

    //restaurantOwner
    // const results = await getRestaurantsOwners()
    // console.log("🚀 ~ main ~ results:", results)

    const results = await getRestaurantsOwnersWithItsDetails()
    console.log("🚀 ~ main ~ results:", results)

    // await insertState("Nairobi", "NRB")
  
}

main().catch((e)=>{
    console.log(e)
});
