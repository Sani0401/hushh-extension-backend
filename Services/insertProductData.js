import supabase from "../config/supabaseConfig.js";
import base64ToObject from "../minor_Services/base64ToObject.js";
async function insertProductData(req, res) {
  const { productData } = req.body;
  const decryptedObject = base64ToObject(productData);

  const productdetails = decryptedObject.productData;
const userID = decryptedObject.userID;
  const brandName = productdetails.brand;

  const { data: brandCheckData, error: brandCheckError } = await supabase
    .from("brands")
    .select()
    .eq("brand_name", brandName);

  if (brandCheckError) {
    console.log("Cannot find the brand name in the table");
    console.log(brandCheckError);
    return res
      .status(400)
      .json({ message: "Cannot find the brand name", error: brandCheckError });
  }

  if (brandCheckData.length === 0) {
    const brandCategory = productdetails.category;
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
    product_url: productdetails.linkUrl,
    product_title: productdetails.productTitle,
    image_url: productdetails.srcUrl,
    description: productdetails.productTitle,
    product_page_url: productdetails.pageUrl,
    brand_name: productdetails.brand,
    price: productdetails.price,
    product_category: productdetails.category,
    user_id: userID,
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
