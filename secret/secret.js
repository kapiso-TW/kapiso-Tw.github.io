const oneTimeHash = "2f1987bf98c09d2f5d2a23a6ae29fa53b9aec8f07ed1330bd439122f5a1a2c2c";
const reusableHash = "a7a39b72f29718e653e73503210fbb597057b7a1c77d1fe321a1afcff041d4e1";
let isOneTimeUsed = false;
const abc = 1
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function unlock() {
    const passwordInput = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    const hashedPassword = await hashPassword(passwordInput);

    if (hashedPassword === reusableHash) {
        document.getElementById("lock-screen").classList.remove("active");
        document.getElementById("content").classList.add("active");
    } else if (hashedPassword === oneTimeHash && !isOneTimeUsed) {
        isOneTimeUsed = true;
        document.getElementById("lock-screen").classList.remove("active");
        document.getElementById("content").classList.add("active");
        abc++
        console.log(abc);
    } else {
        errorMessage.style.display = "block";
    }
}