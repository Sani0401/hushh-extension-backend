import supabase from "../config/supabaseConfig.js";

async function createNewCollection(req, res) {
  try {
    console.log("This is the body: ", req.body);
    const {hushh_id, collection_name, collection_data} = req.body;
    const { data, error } = await supabase.auth.admin.getUserById(hushh_id);
    if (error && error.status == 404 && error.code == "validation_failed") {
      console.log("Error while checking user with userID: ", error);
      return res
        .status(404)
        .json({ message: "Invalid User ID, please check", status: 404 });
    }
    if (error && error.status == 404 && error.code == "user_not_found") {
      console.log("Error while checking user with userID: ", error);
      return res.status(404).json({
        message: "User not found, please create an account",
        status: 404,
      });
    }
    const { insertError} = await supabase.from('user_collections').insert({
        hushh_id: hushh_id,
        collection_name: collection_name,
        collection_data: collection_data
    });
    if( insertError){
        console.log('Error inserting the collection data: ',error);
        return res.status(500).json({message: "Internal Server Error", error: error, status: -1});
    }
    else{
        console.log('Collections created');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:'Internal Server Error',error: error});
  }
}

export default createNewCollection;
