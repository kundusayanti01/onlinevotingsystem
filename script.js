function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function checkEligibility() {
    const dob = document.getElementById("dob").value;
    const age = calculateAge(dob);
    const result = document.getElementById("result");
    const votebtn = document.getElementById("vn")

    if (age >= 18) {
        result.textContent = `You are eligible to vote. Your age is ${age}.`;
        result.style.color = "green";
        votebtn.style.display = "inline-block";
    }
    else {
        result.textContent = `You are not eligible to vote. Your age is ${age}.`;
        result.style.color = "red";
        votebtn.style.display = "none";
    }
}
