class URL{
    constructor(){
        this.isDev = true;
    }
    getUrl(){
        if(this.isDev)
        {
            return "http://localhost:3000/";
        }
        return "https://gameonline-admin-api.herokuapp.com/";
    }
}

export default new URL();
