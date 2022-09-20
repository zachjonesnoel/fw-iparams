var Buffer = require('buffer/').Buffer
exports = {
  onTicketCreateHandler: async function (args) {
    try {
      let bearerToken = Buffer.from(args.iparams.api_key + ":x").toString('base64');
      let url = "https://" + args.iparams.domain_name + ".freshservice.com/api/v2/tickets/" + args.data.ticket.id
      let updated_description = args.data.ticket.description + `<br/> Added notes - <br/> ${args.iparams.notes} <br/> <b> by - ${args.iparams.firstname} </b><br/>`
      let options = {
        method: "PUT",
        url: url,
        headers: {
          "Authorization": `Basic ${bearerToken} %>`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "description": updated_description
        })
      }
      console.log(options)
      let response = await $request.put(url, options)
      console.log(response)
    } catch (e) {
      console.log("Something went wrong! :( ", JSON.stringify(e))
    }
  }
};
