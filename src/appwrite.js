import {Client, Databases,ID,Query} from 'appwrite'


const PROJECT_ID= import.meta.env.VITE_APPWRITE_PROJECT_ID
const DATABASE_ID= import.meta.env.VITE_APPWRITE_DATABASE_ID
const METRICS_ID=import.meta.env.VITE_APPWRITE_METRICS_ID

const client=new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject(PROJECT_ID)

const database= new Databases(client);

export const updateSearchCount=async(searchTerm, movie)=>{

   try{
     const result=await database.listDocuments(DATABASE_ID,METRICS_ID,[Query.equal('searchTerm',searchTerm),

     ] )
     if (result.documents.length>0){
      const doc=result.documents[0];
      await database.updateDocument(DATABASE_ID,METRICS_ID, doc.$id, {count: doc.count+1,})
     } 
     else{
      await database.createDocument(DATABASE_ID,METRICS_ID, ID.unique(), {searchTerm, 
        count: 1,
        movie_id: movie.id,
        poster_url : `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      })
     }
   } catch(error){
    console.error(error)
   }

  console.log(PROJECT_ID,DATABASE_ID, METRICS_ID);
}
export const getTrendingMovies= async()=>{
  try{
     const result = await database.listDocuments(DATABASE_ID,METRICS_ID, [Query.limit(5),
     Query.orderDesc("count")
     ])
     return result.documents;
  }
  catch(error){
    console.error(error);
  }
}