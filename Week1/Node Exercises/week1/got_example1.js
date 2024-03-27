import got from "got"

console.log("hi")

const dumpPage = async () => {
    
    try {
        const resp = await got("https://www.fanshawec.ca");
        console.log(resp.body);
    } catch (err) {
        console.log(err)
    }

}


dumpPage();