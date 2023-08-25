import 'dotenv/config'
import { app } from './infra/app';


app.listen({
  port: Number(process.env.PORT)
}).then(()=>{
  console.log('HTTP Server Running!!');
})