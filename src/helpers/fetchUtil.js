async function postAPI( url, json ){
     return await (await fetch(
          url,
          {
               method:"POST",
               headers:{
                    "Content-Type":"application/json"
               },
               body: JSON.stringify(json)
          }
     )).json()
}

async function getAPI(url){
     return await (await fetch( url )).json()
}

export {
     getAPI,
     postAPI
}