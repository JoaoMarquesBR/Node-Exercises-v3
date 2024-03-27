import got from "got";
const provinces = [
  { code: "NS", name: "Nova Scotia" },
  { code: "NL", name: "Newfoundland" },
  { code: "NB", name: "New Brunswick" },
  { code: "PE", name: "Prince Edward Island" },
  { code: "QC", name: "Quebec" },
  { code: "ON", name: "Ontario" },
  { code: "MB", name: "Manitoba" },
  { code: "SK", name: "Saskatchewan" },
  { code: "AB", name: "Alberta" },
  { code: "BC", name: "British Columbia" },
  { code: "NT", name: "North West Territories" },
  { code: "NU", name: "Nunavut" },
  { code: "YT", name: "Yukon Territory" },
];

const FISCALYEAR = "2022-2023";

// Create a currency formatter.
const currencyFormatter = (numberToFormat) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(numberToFormat);

function fullNameAndProvincePromise(firstName, lastName, provincialCode) {
  return new Promise((resolve, reject) => {
      const provinceName = provinces.find((x) => x.code == provincialCode).name;
      const result = firstName + " " + lastName + " " + provinceName;
      resolve(result);
  });
}

function transferPaymentsFromWebPromise() {
  let srcAddr =
    "http://www.infrastructure.gc.ca/alt-format/opendata/transfer-program-programmes-de-transfert-bil.json";

  return new Promise((resolve, reject) => {
      got(srcAddr, { responseType: "json" })
        .then((response) => {
          // let ont = response.body.gtf.on["2022-2023"];
          let ont = response;

          let result = ont;
          resolve(result);
        })
        .catch((err) => {
          console.log(`Error ==> ${err}`);
          reject(err);
        });
  });
}

function transferPaymentForProvincePromise(gocData,provCode) {
  return new Promise((resolve, reject) => {
      let ont = gocData.body.gtf[provCode]["2022-2023"];
      let result = ont;
      resolve(currencyFormatter( result));
    }, 1000);
}

export {
  provinces,
  currencyFormatter,
  fullNameAndProvincePromise,
  transferPaymentsFromWebPromise,
  transferPaymentForProvincePromise,
};
