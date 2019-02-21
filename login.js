export function LoginService (User) {
    
    const name = requestUserName();    
    const permissions =  isUserAuthorized(name) ? 'admin' : 'user';
    
    const user = new User (name, permissions);

    function requestUserName () {
        return prompt('What´s your name...?') 
    };
    
    function isUserAuthorized (name) {
        return name === 'admin'
    };

    return user
}
    
    
