import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    for (let i = 0; i < 20; i++) {
      const user = new User();
      user.firstName = `Timber ${i + 20}`;
      user.title = `Saw ${i + 20}`;
      user.age = 25;
      await AppDataSource.manager.save(user);
      console.log(user.id);
    }
    const users = await AppDataSource.manager.find(User);
    console.log(users);
  })
  .catch((error) => console.log(error));
