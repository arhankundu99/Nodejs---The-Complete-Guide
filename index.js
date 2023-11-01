const func = async() => {
    console.log("func");
    return new Promise((resolve, reject) => {
        console.log("Inside promise");
        resolve()
        console.log("After resolve");
    })
}

func().then(data => {
    console.log("Resolved promise.")
});
console.log("Hi");