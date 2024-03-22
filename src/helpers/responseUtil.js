export default {
     constructSuccessJson:(message=null, data=null)=>{
          let response = {
               status:"success",
               code:0,
          }
          if(message){
               // Override with custom message?
               response.message = message
          }
          if(data){
               response.data=data
          }
          return response
     },
     constructFailureJson:( message=null, errorData=null)=>{
          let response = {
               message:"Something went wrong",
               code:1,
               status:"failure"
          }
          if(message){
               // Override with custom message?
               response.message = message
          }
          if(errorData){
               response.error=errorData
          }
          return response
     }
}