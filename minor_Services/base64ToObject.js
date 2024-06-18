function base64ToObject(base64String) {
    const jsonString = Buffer.from(base64String, "base64").toString("utf8");
    return JSON.parse(jsonString);
  }

  export default base64ToObject;