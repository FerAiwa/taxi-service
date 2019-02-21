
import { User } from './_models/user.js';
import { LoginService } from './login.js';
import { RideService } from './ride.service.js';


export function Main () {
    const user = LoginService(User);
    const rideService = new RideService(user);




}

