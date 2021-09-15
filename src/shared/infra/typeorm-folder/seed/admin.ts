import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import createConnection from "../index";


async function create() {
   const connection = await createConnection("localhost"); //passar localhost por causa do docker

   const id = uuidV4();
   const password = await hash("admin", 8);

   await connection.query(`INSERT INTO USERS(id, name, email, driver_license, password, "isAdmin", created_at)
                           values('${id}', 'Nome do admin 3', 'admin@rentx.com', '1234567', '${password}', 'true', 'now()')`);
}

create().then(() => console.log("Admin Created!"));