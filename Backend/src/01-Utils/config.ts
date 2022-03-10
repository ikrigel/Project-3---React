abstract class Config {
    public port: number;
    public mySql = { host: "", user: "", password: "", database: "" };
    public mySql2 = { host: "", user: "", password: "", database: "" };
    public loginExpiresIn: string;
    public imagePath: string;
}

class DevelopmentConfig extends Config {
    public constructor() {
        super();
        this.port = 3001;
        this.loginExpiresIn = "30h"; // 30 hours
        this.mySql = { host: "localhost", user: "root", password: "", database: "Vacation-Project" };
        this.mySql2 = { host: "localhost", user: "root", password: "", database: "Northwind" };
        this.imagePath = "./src/Assets/Images/";
    }
}

class ProductionConfig extends Config {
    public constructor() {
        super();
        this.port = +process.env.PORT;
        this.loginExpiresIn = "30h"; // 30 hours
        this.mySql = { host: "eu-cdbr-west-02.cleardb.net", user: "b2625fe33d6b14", password: "876153fe", database: "heroku_cc8c2a377624565" };
        this.mySql2 = { host: "eu-cdbr-west-02.cleardb.net", user: "b2625fe33d6b14", password: "876153fe", database: "heroku_cc8c2a377624565" };
        this.imagePath = "./Assets/Images/";
    }
}

const config = process.env.ENVIRONMENT === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;
