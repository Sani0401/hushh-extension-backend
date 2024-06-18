import supabase from "../config/supabaseConfig.js";

async function insertProductData(req, res) {
  const { userData, productData } = req.body;
  console.log("This is the user data: ", productData);
  const userId = userData.data.user.id;
  const brandName = productData.brand;
  console.log("Request received...");
  const { data, error } = await supabase.auth.admin.getUserById(userId);
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
  const { data: brandCheckData, error: brandCheckError } = await supabase
    .from("brands")
    .select()
    .eq("brand_name", brandName);

  if (brandCheckError) {
    console.log("Cannot find the brand name in the table");
    console.log(brandCheckError);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: brandCheckError });
  }

  if (brandCheckData.length === 0) {
    const brandCategory = productData.category;
    const { error: brandInsertError } = await supabase.from("brands").insert({
      brand_name: brandName,
      brand_category: brandCategory,
      brand_segment: brandCategory,
    });

    if (brandInsertError) {
      console.log("Cannot insert the brand in the table", brandInsertError);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: brandInsertError });
    }
  }

  const { error: productInsertError } = await supabase.from("products").insert({
    product_url: productData.linkUrl,
    product_title: productData.productTitle,
    image_url: productData.srcUrl,
    description: productData.productTitle,
    product_page_url: productData.pageUrl,
    brand_name: productData.brand,
    price: productData.price,
    product_category: productData.category,
    user_id: userId,
  });

  if (productInsertError) {
    console.log("Error adding the product data", productInsertError);
    return res.status(500).json({
      message: "Internal Server Error, Error adding product data.",
      error: productInsertError,
    });
  } else {
    console.log("Data Added Successfully!");
    return res
      .status(200)
      .json({ message: "Product Inserted Successfully", status: 1 });
  }
}

export default insertProductData;
