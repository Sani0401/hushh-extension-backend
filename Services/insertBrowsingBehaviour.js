import supabase from "../config/supabaseConfig.js";

async function insertBrowsingBehaviour(req, res) {
  try {
    console.log(req.body);
    const {
      hushh_id,
      brand,
      email,
      duration,
      product_clicks,
      interest_keywords,
      website_url,
      source,
    } = req.body;

    const { data: behaviourData, error: behaviourDataError } = await supabase
      .from("browsing_behavior")
      .select()
      .eq("brand", brand)
      .eq("hushh_id", hushh_id);

    if (behaviourDataError) {
      console.error("Error getting the behaviour data: ", behaviourDataError);
      return res.status(500).json({
        error: "Error getting the behaviour data",
        details: behaviourDataError,
      });
    }

    if (behaviourData.length > 0) {
      const { error: updateError } = await supabase
        .from("browsing_behavior")
        .update({
          hushh_id: hushh_id,
          website_url: website_url,
          product_clicks: product_clicks,
          interest_keywords: interest_keywords,
          email: email,
          brand: brand,
          source: source,
          duration: duration,
        })
        .eq("brand", brand)
        .eq("hushh_id", hushh_id);

      if (updateError) {
        console.error("Error updating the user behaviour data: ", updateError);
        return res
          .status(500)
          .json({ message: "Error updating the behaviour data", error: updateError });
      } else {
        return res.status(200).json({ message: "User behaviour data updated" });
      }
    } else {
      const { error: insertError } = await supabase
        .from("browsing_behavior")
        .insert({
          hushh_id: hushh_id,
          website_url: website_url,
          product_clicks: product_clicks,
          interest_keywords: interest_keywords,
          email: email,
          brand: brand,
          source: source,
          duration: duration,
        });

      if (insertError) {
        console.error("Error inserting the user behaviour Data: ", insertError);
        return res
          .status(500)
          .json({ message: "Internal Server Error", error: insertError });
      } else {
        return res.status(201).json({ message: "User behaviour data inserted" });
      }
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ error: "Unexpected error", details: error.message });
  }
}

export default insertBrowsingBehaviour;
