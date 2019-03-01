
import { User } from './_models/user.js';
import { LoginService } from './login.js';
import { RideService } from './ride.service.js';


export function Main () {
//Si en el momento de iniciar la función le paso los permisos, podría utilizar una factoría
//para devolver unos métodos u otros en el servicio RideService según si es ADMIN | USER.
    const user = LoginService(User);
    const rideService = new RideService(user);
}

