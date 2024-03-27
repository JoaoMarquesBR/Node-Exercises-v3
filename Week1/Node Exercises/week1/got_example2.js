// Load the got module
import got from "got";
// Lets try to make a HTTP GET request to GOC's website and get some transfer info in
const dumpJson = async () => {
  const srcAddr =
    "http://www.infrastructure.gc.ca/alt-format/opendata/transfer-program-programmes-detransfert-bil.json";
  // Create a currency formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  });
  try {
    const response = await got(srcAddr, { responseType: "json" });
    console.log(response.body.gtf.on["2021-2022"]);
    //console.log(Object.keys(response.body.gtf.on.total));
    // strip out the Ontario amount
    let ont = response.body.gtf.on["2022-2023"];
    // format to currency
    ont = formatter.format(ont);
    // dump to the console using template literal
    console.log(`Ontario's transfer amount for 2022-2023 was ${ont}`);
  } catch (error) {
    console.log(error);
    //=> 'Internal server error ...'
  }
};
dumpJson();
