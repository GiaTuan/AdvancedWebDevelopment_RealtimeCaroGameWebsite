class URL{
    constructor(){
        this.isDev = true;
    }
    getUrl(){
        if(this.isDev)
        {
            return "http://localhost:3000/";
        }
        return "";
    }
}

export default new URL();
