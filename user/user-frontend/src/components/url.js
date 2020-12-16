class URL{
    constructor(){
        this.isDev = false;
    }
    getUrl(){
        if(this.isDev)
        {
            return "http://localhost:3000/";
        }
        return "https://gameonline-user-api.herokuapp.com/";
    }
}

export default new URL();
