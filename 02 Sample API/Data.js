const data = [
    {
        name: "Riyaz",
        age: "25",
        Email: "moh.riyazpathan@gmail.com",
        getAge: function () {
            console.log("Inside getAge Function...");
            return this.age;
        }
    }, {
        name:"Arbaz",
        age : "25"

    }]


module.exports = data;