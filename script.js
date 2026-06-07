
document.getElementById("studentForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const formData = {
        name: this.name.value,
        roll: this.roll.value,
        course: this.course.value,
        year: this.year.value,
        cgpa: this.cgpa.value
    };

    const response = await fetch("http://localhost:3000/submit", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(formData)
    });

    const result = await response.text();

    document.getElementById("ans").textContent = result;
    
    this.reset();
});
