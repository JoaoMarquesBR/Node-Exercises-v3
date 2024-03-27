import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import {
  currencyFormatter,
  provinces,
  fullNameAndProvincePromise,
  transferPaymentsFromWebPromise,
  transferPaymentForProvincePromise,
} from "./lab2_routines.js";

const argv = yargs(hideBin(process.argv))
  .options({
    firstName: {
      demandOption: true,
      alias: "fname",
      describe: "Resident’s first name",
      string: true,
    },
    lastName: {
      demandOption: true,
      alias: "lname",
      describe: "Resident’s last name",
      string: true,
    },
    province: {
      demandOption: true,
      alias: "prov",
      describe: "Resident’s home province",
      string: true,
      choices: provinces.map((province) => province.code),
    },
  })
  .help()
  .alias("help", "h")
    .parse();
  chainFunction(argv.firstName,argv.lastName,argv.province)


function chainFunction(firstName, lastName, provincialCode) {
  return fullNameAndProvincePromise(firstName, lastName, provincialCode)
      .then((result1) => {
          console.log()
      return transferPaymentsFromWebPromise();
    })
      .then((result2) => {
          console.log("Lab 2")
          console.log()
      return transferPaymentForProvincePromise(
        result2,
        provincialCode.toLowerCase()
      );
    })
      .then((result3) => {
        
          let provinceName = provinces.find(x=>x.code.toLowerCase() === provincialCode.toLowerCase()).name
      console.log(
        `${firstName}, ${lastName} lives in ${provinceName}. It received ${result3} in transfer payments.`
      );

      return result3;
    })
    .catch((error) => {
      console.error("Error in promise chain:", error);
      throw error;
    });
}

// Example usage:
// chainFunction("John", "Doe", "SK");
